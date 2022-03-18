/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */

import type { Context } from "./src/context";

declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  ItemListInput: {
    // input type
    name: string; // String!
    price: number; // Float!
  };
}

export interface NexusGenEnums {}

export interface NexusGenScalars {
  String: string;
  Int: number;
  Float: number;
  Boolean: boolean;
  ID: string;
}

export interface NexusGenObjects {
  AuthPayload: {
    // root type
    token: string; // String!
    vendor: NexusGenRootTypes["Vendor"]; // Vendor!
  };
  Item: {
    // root type
    id: number; // Int!
    name: string; // String!
    price: number; // Float!
  };
  Menu: {
    // root type
    cuisine: string; // String!
    id: number; // Int!
  };
  Mutation: {};
  Query: {};
  Vendor: {
    // root type
    balance: number; // Float!
    email: string; // String!
    id: number; // Int!
    name: string; // String!
  };
  Vendors: {
    // root type
    count: number; // Int!
    vendors: NexusGenRootTypes["Vendor"][]; // [Vendor!]!
  };
}

export interface NexusGenInterfaces {}

export interface NexusGenUnions {}

export type NexusGenRootTypes = NexusGenObjects;

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars;

export interface NexusGenFieldTypes {
  AuthPayload: {
    // field return type
    token: string; // String!
    vendor: NexusGenRootTypes["Vendor"]; // Vendor!
  };
  Item: {
    // field return type
    id: number; // Int!
    name: string; // String!
    price: number; // Float!
  };
  Menu: {
    // field return type
    cuisine: string; // String!
    id: number; // Int!
    items: NexusGenRootTypes["Item"][]; // [Item!]!
  };
  Mutation: {
    // field return type
    login: NexusGenRootTypes["AuthPayload"]; // AuthPayload!
    signup: NexusGenRootTypes["AuthPayload"]; // AuthPayload!
  };
  Query: {
    // field return type
    vendor: NexusGenRootTypes["Vendor"] | null; // Vendor
    vendorsList: NexusGenRootTypes["Vendors"]; // Vendors!
  };
  Vendor: {
    // field return type
    balance: number; // Float!
    email: string; // String!
    id: number; // Int!
    menu: NexusGenRootTypes["Menu"] | null; // Menu
    name: string; // String!
  };
  Vendors: {
    // field return type
    count: number; // Int!
    vendors: NexusGenRootTypes["Vendor"][]; // [Vendor!]!
  };
}

export interface NexusGenFieldTypeNames {
  AuthPayload: {
    // field return type name
    token: "String";
    vendor: "Vendor";
  };
  Item: {
    // field return type name
    id: "Int";
    name: "String";
    price: "Float";
  };
  Menu: {
    // field return type name
    cuisine: "String";
    id: "Int";
    items: "Item";
  };
  Mutation: {
    // field return type name
    login: "AuthPayload";
    signup: "AuthPayload";
  };
  Query: {
    // field return type name
    vendor: "Vendor";
    vendorsList: "Vendors";
  };
  Vendor: {
    // field return type name
    balance: "Float";
    email: "String";
    id: "Int";
    menu: "Menu";
    name: "String";
  };
  Vendors: {
    // field return type name
    count: "Int";
    vendors: "Vendor";
  };
}

export interface NexusGenArgTypes {
  Mutation: {
    login: {
      // args
      email: string; // String!
      password: string; // String!
    };
    signup: {
      // args
      email: string; // String!
      name: string; // String!
      password: string; // String!
    };
  };
  Query: {
    vendor: {
      // args
      email: string; // String!
    };
  };
}

export interface NexusGenAbstractTypeMembers {}

export interface NexusGenTypeInterfaces {}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false;
    resolveType: true;
    __typename: false;
  };
};

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes:
    | NexusGenTypes["inputNames"]
    | NexusGenTypes["enumNames"]
    | NexusGenTypes["scalarNames"];
  allOutputTypes:
    | NexusGenTypes["objectNames"]
    | NexusGenTypes["enumNames"]
    | NexusGenTypes["unionNames"]
    | NexusGenTypes["interfaceNames"]
    | NexusGenTypes["scalarNames"];
  allNamedTypes:
    | NexusGenTypes["allInputTypes"]
    | NexusGenTypes["allOutputTypes"];
  abstractTypes: NexusGenTypes["interfaceNames"] | NexusGenTypes["unionNames"];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}

declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {}
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {}
  interface NexusGenPluginFieldConfig<
    TypeName extends string,
    FieldName extends string
  > {}
  interface NexusGenPluginInputFieldConfig<
    TypeName extends string,
    FieldName extends string
  > {}
  interface NexusGenPluginSchemaConfig {}
  interface NexusGenPluginArgConfig {}
}
