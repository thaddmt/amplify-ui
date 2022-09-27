export const schema = {
  models: {
    Cabin: {
      name: 'Cabin',
      fields: {
        id: {
          name: 'id',
          isArray: false,
          type: 'ID',
          isRequired: true,
          attributes: [],
        },
        name: {
          name: 'name',
          isArray: false,
          type: 'String',
          isRequired: true,
          attributes: [],
        },
        thumbnail: {
          name: 'thumbnail',
          isArray: false,
          type: 'String',
          isRequired: true,
          attributes: [],
        },
        thumbnailAlt: {
          name: 'thumbnailAlt',
          isArray: false,
          type: 'String',
          isRequired: true,
          attributes: [],
        },
        beds: {
          name: 'beds',
          isArray: false,
          type: 'Int',
          isRequired: true,
          attributes: [],
        },
        rate: {
          name: 'rate',
          isArray: false,
          type: 'Int',
          isRequired: true,
          attributes: [],
        },
        rating: {
          name: 'rating',
          isArray: false,
          type: 'Int',
          isRequired: true,
          attributes: [],
        },
        createdAt: {
          name: 'createdAt',
          isArray: false,
          type: 'AWSDateTime',
          isRequired: false,
          attributes: [],
          isReadOnly: true,
        },
        updatedAt: {
          name: 'updatedAt',
          isArray: false,
          type: 'AWSDateTime',
          isRequired: false,
          attributes: [],
          isReadOnly: true,
        },
      },
      syncable: true,
      pluralName: 'Cabins',
      attributes: [
        {
          type: 'model',
          properties: {},
        },
        {
          type: 'auth',
          properties: {
            rules: [
              {
                provider: 'userPools',
                ownerField: 'owner',
                allow: 'owner',
                identityClaim: 'cognito:username',
                operations: ['create', 'update', 'delete', 'read'],
              },
              {
                allow: 'private',
                provider: 'userPools',
                operations: ['read'],
              },
              {
                allow: 'public',
                provider: 'apiKey',
                operations: ['read'],
              },
            ],
          },
        },
      ],
    },
  },
  enums: {},
  nonModels: {},
  version: '3e59f4427c4537a0148f5755f1c91e24',
};
