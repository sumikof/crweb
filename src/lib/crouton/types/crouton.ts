export type Crouton = {
  "version": "0.1.0",
  "name": "crouton",
  "instructions": [
    {
      "name": "init",
      "accounts": [],
      "args": []
    },
    {
      "name": "helloWorld",
      "accounts": [],
      "args": [
        {
          "name": "msg",
          "type": "string"
        }
      ]
    },
    {
      "name": "signupUser",
      "accounts": [
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "username",
          "type": "string"
        },
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "image",
          "type": "string"
        }
      ]
    },
    {
      "name": "editProfile",
      "accounts": [
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "username",
          "type": "string"
        },
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "image",
          "type": "string"
        }
      ]
    },
    {
      "name": "createPost",
      "accounts": [
        {
          "name": "postAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "content",
          "type": "string"
        }
      ]
    },
    {
      "name": "updatePost",
      "accounts": [
        {
          "name": "postAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "content",
          "type": "string"
        }
      ]
    },
    {
      "name": "deletePost",
      "accounts": [
        {
          "name": "postAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "userState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "username",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "verified",
            "type": "bool"
          },
          {
            "name": "image",
            "type": "string"
          },
          {
            "name": "posts",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "postState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "userAccount",
            "type": "publicKey"
          },
          {
            "name": "index",
            "type": "u32"
          },
          {
            "name": "content",
            "type": "string"
          },
          {
            "name": "createdAt",
            "type": "i64"
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "UserEvent",
      "fields": [
        {
          "name": "label",
          "type": "string",
          "index": false
        },
        {
          "name": "userId",
          "type": "publicKey",
          "index": false
        }
      ]
    },
    {
      "name": "PostEvent",
      "fields": [
        {
          "name": "label",
          "type": "string",
          "index": false
        },
        {
          "name": "postId",
          "type": "publicKey",
          "index": false
        }
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "ValidationError",
      "msg": "id:001,msg:Validation Error"
    }
  ]
};

export const IDL: Crouton = {
  "version": "0.1.0",
  "name": "crouton",
  "instructions": [
    {
      "name": "init",
      "accounts": [],
      "args": []
    },
    {
      "name": "helloWorld",
      "accounts": [],
      "args": [
        {
          "name": "msg",
          "type": "string"
        }
      ]
    },
    {
      "name": "signupUser",
      "accounts": [
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "username",
          "type": "string"
        },
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "image",
          "type": "string"
        }
      ]
    },
    {
      "name": "editProfile",
      "accounts": [
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "username",
          "type": "string"
        },
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "image",
          "type": "string"
        }
      ]
    },
    {
      "name": "createPost",
      "accounts": [
        {
          "name": "postAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "content",
          "type": "string"
        }
      ]
    },
    {
      "name": "updatePost",
      "accounts": [
        {
          "name": "postAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "content",
          "type": "string"
        }
      ]
    },
    {
      "name": "deletePost",
      "accounts": [
        {
          "name": "postAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "userState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "username",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "verified",
            "type": "bool"
          },
          {
            "name": "image",
            "type": "string"
          },
          {
            "name": "posts",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "postState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "userAccount",
            "type": "publicKey"
          },
          {
            "name": "index",
            "type": "u32"
          },
          {
            "name": "content",
            "type": "string"
          },
          {
            "name": "createdAt",
            "type": "i64"
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "UserEvent",
      "fields": [
        {
          "name": "label",
          "type": "string",
          "index": false
        },
        {
          "name": "userId",
          "type": "publicKey",
          "index": false
        }
      ]
    },
    {
      "name": "PostEvent",
      "fields": [
        {
          "name": "label",
          "type": "string",
          "index": false
        },
        {
          "name": "postId",
          "type": "publicKey",
          "index": false
        }
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "ValidationError",
      "msg": "id:001,msg:Validation Error"
    }
  ]
};
