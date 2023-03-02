import Amplify from '@aws-amplify/core';
import {
  RekognitionStreamingClient,
  StartFaceLivenessSessionCommand,
} from '@aws-sdk/client-rekognitionstreaming';
import { LivenessStreamProvider } from '../liveness-stream-provider';
import { VideoRecorder } from '../video-recorder';
import { mockClientSessionInformationEvent } from '../liveness-test-helpers';

jest.mock('../video-recorder');
jest.mock('@aws-sdk/client-rekognitionstreaming');
jest.mock('@aws-amplify/core');
const mockGet = jest.fn().mockImplementation(() => {
  return {
    accessKeyId: 'accessKeyId',
    sessionToken: 'sessionTokenId',
    secretAccessKey: 'secretAccessKey',
    identityId: 'identityId',
    authenticated: true,
    expiration: new Date(),
  };
});
Amplify.Credentials.get = mockGet;

let SWITCH = false;

describe('LivenessStreamProvider', () => {
  const mockNavigatorMediaDevices: any = {
    getUserMedia: jest.fn(),
    enumerateDevices: jest.fn(),
  };
  const mockReadableStream = {
    getReader: () => {
      return {
        cancel: jest.fn().mockResolvedValueOnce(undefined),
        read: () => {
          return {
            then: (success) => {
              if (SWITCH) {
                const blob = new Blob([]);
                return success({ done: true, value: blob });
              } else {
                SWITCH = true;
                const blob = new Blob(['foobar']);
                return success({ done: false, value: blob });
              }
            },
          };
        },
      };
    },
  } as unknown as ReadableStream<Blob>;
  const mockReadableStreamWithEmptyChunks = {
    getReader: () => {
      return {
        read: () => {
          return {
            then: (success) => {
              if (SWITCH) {
                const blob = new Blob([]);
                return success({ done: true, value: blob });
              } else {
                SWITCH = true;
                return success({ done: false, value: [] });
              }
            },
          };
        },
      };
    },
  } as unknown as ReadableStream<Blob>;
  const mockVideoRecorder: any = {
    start: jest.fn(),
    stop: jest.fn(),
    getBlob: jest.fn(),
    destroy: jest.fn(),
    dispatch: jest.fn(),
    getState: jest.fn().mockReturnValue('recording'),
    videoStream: mockReadableStream,
  };
  const mockCameraDevice: MediaDeviceInfo = {
    deviceId: 'some-device-id',
    groupId: 'some-group-id',
    kind: 'videoinput',
    label: 'some-label',
    toJSON: () => ({}),
  };
  const mockVideoMediaStream = {
    getTracks: () => [
      {
        getSettings: () => ({
          width: 640,
          height: 480,
          deviceId: mockCameraDevice.deviceId,
        }),
      },
    ],
  } as MediaStream;
  const mockVideoEl = document.createElement('video');

  beforeEach(() => {
    (VideoRecorder as jest.Mock).mockImplementation(() => mockVideoRecorder);
    (RekognitionStreamingClient as jest.Mock).mockImplementation(() => {
      return {
        send: jest.fn().mockImplementation(() => {
          return {
            LivenessResponseStream: 'mockResponseStream',
          };
        }),
      };
    });
    SWITCH = false;
  });

  describe('constructor', () => {
    test('happy case', () => {
      const provider = new LivenessStreamProvider(
        'sessionId',
        mockVideoMediaStream,
        mockVideoEl
      );
    });
  });

  describe('getResponseStream', () => {
    test('happy case', async () => {
      const provider = new LivenessStreamProvider(
        'sessionId',
        mockVideoMediaStream,
        mockVideoEl
      );
      expect(await provider.getResponseStream()).toBeDefined();
    });
  });

  describe('startLivenessVideoConnection', () => {
    test('happy case', async () => {
      const provider = new LivenessStreamProvider(
        'sessionId',
        mockVideoMediaStream,
        mockVideoEl
      );
      await provider.startRecordingLivenessVideo();
      expect(mockVideoRecorder.start).toHaveBeenCalledTimes(1);
    });
  });

  describe('getAsyncGeneratorFromReadableStream', () => {
    test('yield video chunk events', async () => {
      const provider = new LivenessStreamProvider(
        'sessionId',
        mockVideoMediaStream,
        mockVideoEl
      );
      const requestStream = (
        provider as any
      ).getAsyncGeneratorFromReadableStream(mockReadableStream)();
      const yieldedEvents: any[] = [];
      for await (const event of requestStream) {
        yieldedEvents.push(event);
      }
      expect(yieldedEvents.length).toBe(1);
    });

    test('does not yield empty video chunks', async () => {
      const provider = new LivenessStreamProvider(
        'sessionId',
        mockVideoMediaStream,
        mockVideoEl
      );
      const requestStream = (
        provider as any
      ).getAsyncGeneratorFromReadableStream(
        mockReadableStreamWithEmptyChunks
      )();
      const yieldedEvents: any[] = [];
      for await (const event of requestStream) {
        yieldedEvents.push(event);
      }
      expect(yieldedEvents.length).toBe(0);
    });
  });

  describe('sendClientInfo', () => {
    test('happy case', async () => {
      const provider = new LivenessStreamProvider(
        'sessionId',
        mockVideoMediaStream,
        mockVideoEl
      );
      await provider.sendClientInfo(mockClientSessionInformationEvent);

      expect(mockVideoRecorder.dispatch).toHaveBeenCalledTimes(1);
    });
  });

  describe('stopVideo', () => {
    test('should stop sending video events', async () => {
      const provider = new LivenessStreamProvider(
        'sessionId',
        mockVideoMediaStream,
        mockVideoEl
      );
      const response = await provider.stopVideo();
      expect(mockVideoRecorder.stop).toHaveBeenCalled();
      expect(response).toBeUndefined();
    });
  });

  describe('dispatchStopVideoEvent', () => {
    test('should dispatch an empty video chunk', async () => {
      const provider = new LivenessStreamProvider(
        'sessionId',
        mockVideoMediaStream,
        mockVideoEl
      );
      const response = await provider.dispatchStopVideoEvent();
      expect(mockVideoRecorder.dispatch).toHaveBeenCalledTimes(2);
      expect(response).toBeUndefined();
    });
  });

  describe('endStream', () => {
    test('should stop video and end the stream and return a promise if cancelled successfully', async () => {
      const provider = new LivenessStreamProvider(
        'sessionId',
        mockVideoMediaStream,
        mockVideoEl
      );
      const response = await provider.endStream();

      expect(mockVideoRecorder.stop).toHaveBeenCalled();
      expect(response).toBeUndefined();
    });
  });
});