import React, { createContext, useContext, useState, useEffect } from "react";
// import { installAuxiBotProtocolRemotely } from "./helper";

const Web5Context = createContext();

export const useWeb5 = () => {
  return useContext(Web5Context);
};

export const Web5Provider = ({ children }) => {
  const [web5, setWeb5] = useState(null);
  const [userDid, setUserDid] = useState(null);

  useEffect(() => {
    const initializeWeb5 = async () => {
      try {
        const { Web5 } = await import("@web5/api");
        const { web5, did } = await Web5.connect({ sync: "5s" });
        if (web5 && did) {
          setWeb5(web5);
          setUserDid(did);
          await configureAuxiBotProtocol(web5, did);
        }
      } catch (error) {
        console.error("Error initializing Web5:", error);
      }
    };
    initializeWeb5();
  }, []);

  // const configureAuxiBotProtocol = async (web5, did) => {
  //   const protocolDefinition = auxiBotProtocolDefinition();
  //   const protocolUrl = protocolDefinition.protocol;

  //   const remoteProtocolResponse = await getProtocol(web5, did, protocolUrl);
  //   const { protocols: remoteProtocols, status: remoteProtocolStatus } =
  //     remoteProtocolResponse || {};
  //   // if (!remoteProtocols || !remoteProtocolStatus) return 'not found';

  //   if (!remoteProtocolStatus || !remoteProtocols) {
  //     const result = await installAuxiBotProtocolRemotely(
  //       web5,
  //       did,
  //       protocolDefinition
  //     );
  //     console.log({ result });
  //     console.log("Protocol installed successfully");
  //   }
  // };
  const installAuxiBotProtocolRemotely = async (
    web5,
    did,
    protocolDefinition
  ) => {
    const { protocol } = await web5.dwn.protocols.configure({
      message: {
        definition: protocolDefinition,
      },
    });
    return await protocol.send(did);
  };
  const auxiBotProtocolDefinition = () => {
    const auxiBotProtocolDefinition = {
      protocol: "https://didcomm.org/auxi-bot-protocol",
      published: true,
      types: {
        user: {
          schema: "https://didcomm.org/auxi-bot-protocol/schemas/user.json",
          dataFormats: ["application/json"],
        },
        auxi: {
          schema: "https://didcomm.org/auxi-bot-protocol/schemas/auxi.json",
          dataFormats: ["application/json"],
        },
        todo: {
          schema: "https://didcomm.org/auxi-bot-protocol/schemas/todo.json",
          dataFormats: ["application/json"],
        },
      },
      structure: {
        user: {
          $actions: [
            {
              who: "author",
              of: "user",
              can: "read",
            },
            {
              who: "anyone",
              can: "write",
            },
          ],
          todo: {
            $actions: [
              {
                who: "author",
                of: "todo",
                can: "read",
              },
              {
                who: "anyone",
                can: "write",
              },
            ],
          },
          auxi: {
            $actions: [
              { who: "anyone", can: "write" },
              { who: "author", of: "auxi", can: "read" },
            ],
          },
        },
      },
    };
    return auxiBotProtocolDefinition;
  };

  const configureAuxiBotProtocol = async (web5, did) => {
    const protocolDefinition = await auxiBotProtocolDefinition();
    const protocolUrl = protocolDefinition.protocol;

    const { protocols: localProtocols, status: localProtocolStatus } =
      await getLocalProtocol(web5, protocolUrl);
    console.log({ localProtocols, localProtocolStatus });
    // if (!localProtocolStatus || !localProtocols) return 'not found';

    if (localProtocolStatus.code !== 200 || localProtocols.length === 0) {
      const result = await installAuxiBotProtocolLocally(
        web5,
        protocolDefinition
      );
      console.log({ result });
      console.log("Protocol installed locally");
    }

    const remoteProtocolResponse = await getRemoteProtocol(
      web5,
      did,
      protocolUrl
    );
    const { protocols: remoteProtocols, status: remoteProtocolStatus } =
      remoteProtocolResponse || {};
    // if (!remoteProtocols || !remoteProtocolStatus) return 'not found';

    if (!remoteProtocolStatus || !remoteProtocols) {
      const result = await installAuxiBotProtocolRemotely(
        web5,
        did,
        protocolDefinition
      );
      console.log({ result });
      console.log("Protocol installed remotely");
    }
  };

  const installAuxiBotProtocolLocally = async (web5, protocolDefinition) => {
    return await web5.dwn.protocols.configure({
      message: {
        definition: protocolDefinition,
      },
    });
  };

  const getLocalProtocol = async (web5) => {
    return await web5.dwn.protocols.query({
      message: {
        filter: {
          protocol: "https://didcomm.org/auxi-bot-protocol",
        },
      },
    });
  };

  //get  protocol from remote dwn
  const getRemoteProtocol = async (web5, did) => {
    await web5.dwn.protocols.query({
      from: did,
      message: {
        filter: {
          protocol: "https://didcomm.org/auxi-bot-protocol",
        },
      },
    });
  };

  const contextValue = {
    web5,
    userDid,
  };

  return (
    <Web5Context.Provider value={contextValue}>{children}</Web5Context.Provider>
  );
};
