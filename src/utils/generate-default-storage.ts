import { TezosToolkit, MichelsonMap } from "@taquito/taquito";
import { Schema } from "@taquito/michelson-encoder";

interface Storage {
  [property: string]: any;
}

const generateDefaultStorage = async (address: string, contractNetwork: string, Tezos: TezosToolkit) => {
  await Tezos.setProvider({
    rpc: `https://api.tez.ie/rpc/${contractNetwork}`,
  });

  const comparableTypes: string[] = [
    "int",
    "nat",
    "list",
    "string",
    "bytes",
    "mutez",
    "bool",
    "key_hash",
    "timestamp",
    "address",
  ];
  let defaultStorage: Storage = {};

  try {
    const contract = await Tezos.contract.at(address);
    // gets storage from contract
    const storage: any = await contract.storage();
    // gets storage from code
    const code: any = contract.script.code.find((x: any) => x.hasOwnProperty("prim") && x.prim === "storage");
    if (!code) throw new Error("No code available!");

    // gets storage schema
    const newSchema = new Schema(code.args[0]);
    const schema = newSchema.ExtractSchema();

    console.log("Schema:", schema, "Storage:", storage);

    const schemaKeys: string[] = Object.keys(schema);

    if (schemaKeys.length === 1 && schemaKeys[0] === "map") {
      // the storage is just a map
      defaultStorage = new MichelsonMap();
    } else if (schemaKeys.length === 1 && comparableTypes.includes(schemaKeys[0])) {
      // the storage is just a big map
      defaultStorage = new MichelsonMap();
    } else {
      // loops through schema and populates default storage
      schemaKeys.forEach((key: string) => {
        const value: any = storage[key];
        if (comparableTypes.includes(schema[key])) {
          // simple types
          defaultStorage[key] = value;
        } else if (schema[key] === "set" && Array.isArray(value)) {
          // sets
          defaultStorage[key] = value;
        } else if (
          typeof schema[key] === "object" &&
          schema[key] !== null &&
          Object.keys(schema[key]).length === 1 &&
          Object.keys(schema[key])[0] === "map"
        ) {
          // maps
          // verifies value is a map
          if (MichelsonMap.isMichelsonMap(value)) {
            // copies map values
            const newMap: any = {};
            value.forEach((_value: string, _key: string) => {
              const newNewMap = {};
              if (typeof _key === "object") {
                Object.keys(_key).forEach((k) => {
                  (newNewMap as any)[k] = new MichelsonMap();
                });
              } else {
                newMap[_key] = _value;
              }
            });
            defaultStorage[key] = MichelsonMap.fromLiteral(newMap);
          }
        } else if (
          typeof schema[key] === "object" &&
          schema[key] !== null &&
          Object.keys(schema[key]).length === 1 &&
          Object.keys(schema[key])[0] !== "map"
        ) {
          // Empty BigMaps
          defaultStorage[key] = new MichelsonMap();
        } else if (
          typeof schema[key] === "object" &&
          schema[key] !== null &&
          Object.keys(schema[key]).length > 1 &&
          Object.keys(schema[key])[0] !== "map"
        ) {
          if (storage[key]) defaultStorage[key] = MichelsonMap.fromLiteral(storage[key]);
          defaultStorage[key] = MichelsonMap.fromLiteral(storage);
        }
      });
    }
    console.log("Default Storage: ", defaultStorage);
    return { status: "success", msg: defaultStorage };
  } catch (err) {
    return { status: "error", msg: err };
  }
};

export default generateDefaultStorage;
