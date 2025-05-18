
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model School
 * 
 */
export type School = $Result.DefaultSelection<Prisma.$SchoolPayload>
/**
 * Model Classroom
 * 
 */
export type Classroom = $Result.DefaultSelection<Prisma.$ClassroomPayload>
/**
 * Model Link
 * 
 */
export type Link = $Result.DefaultSelection<Prisma.$LinkPayload>
/**
 * Model LinkClassroom
 * 
 */
export type LinkClassroom = $Result.DefaultSelection<Prisma.$LinkClassroomPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Schools
 * const schools = await prisma.school.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Schools
   * const schools = await prisma.school.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.school`: Exposes CRUD operations for the **School** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Schools
    * const schools = await prisma.school.findMany()
    * ```
    */
  get school(): Prisma.SchoolDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.classroom`: Exposes CRUD operations for the **Classroom** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Classrooms
    * const classrooms = await prisma.classroom.findMany()
    * ```
    */
  get classroom(): Prisma.ClassroomDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.link`: Exposes CRUD operations for the **Link** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Links
    * const links = await prisma.link.findMany()
    * ```
    */
  get link(): Prisma.LinkDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.linkClassroom`: Exposes CRUD operations for the **LinkClassroom** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LinkClassrooms
    * const linkClassrooms = await prisma.linkClassroom.findMany()
    * ```
    */
  get linkClassroom(): Prisma.LinkClassroomDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    School: 'School',
    Classroom: 'Classroom',
    Link: 'Link',
    LinkClassroom: 'LinkClassroom'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "school" | "classroom" | "link" | "linkClassroom"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      School: {
        payload: Prisma.$SchoolPayload<ExtArgs>
        fields: Prisma.SchoolFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SchoolFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SchoolFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolPayload>
          }
          findFirst: {
            args: Prisma.SchoolFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SchoolFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolPayload>
          }
          findMany: {
            args: Prisma.SchoolFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolPayload>[]
          }
          create: {
            args: Prisma.SchoolCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolPayload>
          }
          createMany: {
            args: Prisma.SchoolCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SchoolCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolPayload>[]
          }
          delete: {
            args: Prisma.SchoolDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolPayload>
          }
          update: {
            args: Prisma.SchoolUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolPayload>
          }
          deleteMany: {
            args: Prisma.SchoolDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SchoolUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SchoolUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolPayload>[]
          }
          upsert: {
            args: Prisma.SchoolUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolPayload>
          }
          aggregate: {
            args: Prisma.SchoolAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSchool>
          }
          groupBy: {
            args: Prisma.SchoolGroupByArgs<ExtArgs>
            result: $Utils.Optional<SchoolGroupByOutputType>[]
          }
          count: {
            args: Prisma.SchoolCountArgs<ExtArgs>
            result: $Utils.Optional<SchoolCountAggregateOutputType> | number
          }
        }
      }
      Classroom: {
        payload: Prisma.$ClassroomPayload<ExtArgs>
        fields: Prisma.ClassroomFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClassroomFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassroomPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClassroomFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassroomPayload>
          }
          findFirst: {
            args: Prisma.ClassroomFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassroomPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClassroomFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassroomPayload>
          }
          findMany: {
            args: Prisma.ClassroomFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassroomPayload>[]
          }
          create: {
            args: Prisma.ClassroomCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassroomPayload>
          }
          createMany: {
            args: Prisma.ClassroomCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClassroomCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassroomPayload>[]
          }
          delete: {
            args: Prisma.ClassroomDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassroomPayload>
          }
          update: {
            args: Prisma.ClassroomUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassroomPayload>
          }
          deleteMany: {
            args: Prisma.ClassroomDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClassroomUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ClassroomUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassroomPayload>[]
          }
          upsert: {
            args: Prisma.ClassroomUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassroomPayload>
          }
          aggregate: {
            args: Prisma.ClassroomAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClassroom>
          }
          groupBy: {
            args: Prisma.ClassroomGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClassroomGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClassroomCountArgs<ExtArgs>
            result: $Utils.Optional<ClassroomCountAggregateOutputType> | number
          }
        }
      }
      Link: {
        payload: Prisma.$LinkPayload<ExtArgs>
        fields: Prisma.LinkFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LinkFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LinkFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkPayload>
          }
          findFirst: {
            args: Prisma.LinkFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LinkFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkPayload>
          }
          findMany: {
            args: Prisma.LinkFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkPayload>[]
          }
          create: {
            args: Prisma.LinkCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkPayload>
          }
          createMany: {
            args: Prisma.LinkCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LinkCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkPayload>[]
          }
          delete: {
            args: Prisma.LinkDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkPayload>
          }
          update: {
            args: Prisma.LinkUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkPayload>
          }
          deleteMany: {
            args: Prisma.LinkDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LinkUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LinkUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkPayload>[]
          }
          upsert: {
            args: Prisma.LinkUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkPayload>
          }
          aggregate: {
            args: Prisma.LinkAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLink>
          }
          groupBy: {
            args: Prisma.LinkGroupByArgs<ExtArgs>
            result: $Utils.Optional<LinkGroupByOutputType>[]
          }
          count: {
            args: Prisma.LinkCountArgs<ExtArgs>
            result: $Utils.Optional<LinkCountAggregateOutputType> | number
          }
        }
      }
      LinkClassroom: {
        payload: Prisma.$LinkClassroomPayload<ExtArgs>
        fields: Prisma.LinkClassroomFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LinkClassroomFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkClassroomPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LinkClassroomFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkClassroomPayload>
          }
          findFirst: {
            args: Prisma.LinkClassroomFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkClassroomPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LinkClassroomFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkClassroomPayload>
          }
          findMany: {
            args: Prisma.LinkClassroomFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkClassroomPayload>[]
          }
          create: {
            args: Prisma.LinkClassroomCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkClassroomPayload>
          }
          createMany: {
            args: Prisma.LinkClassroomCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LinkClassroomCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkClassroomPayload>[]
          }
          delete: {
            args: Prisma.LinkClassroomDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkClassroomPayload>
          }
          update: {
            args: Prisma.LinkClassroomUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkClassroomPayload>
          }
          deleteMany: {
            args: Prisma.LinkClassroomDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LinkClassroomUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LinkClassroomUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkClassroomPayload>[]
          }
          upsert: {
            args: Prisma.LinkClassroomUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkClassroomPayload>
          }
          aggregate: {
            args: Prisma.LinkClassroomAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLinkClassroom>
          }
          groupBy: {
            args: Prisma.LinkClassroomGroupByArgs<ExtArgs>
            result: $Utils.Optional<LinkClassroomGroupByOutputType>[]
          }
          count: {
            args: Prisma.LinkClassroomCountArgs<ExtArgs>
            result: $Utils.Optional<LinkClassroomCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    school?: SchoolOmit
    classroom?: ClassroomOmit
    link?: LinkOmit
    linkClassroom?: LinkClassroomOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type SchoolCountOutputType
   */

  export type SchoolCountOutputType = {
    classrooms: number
  }

  export type SchoolCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    classrooms?: boolean | SchoolCountOutputTypeCountClassroomsArgs
  }

  // Custom InputTypes
  /**
   * SchoolCountOutputType without action
   */
  export type SchoolCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchoolCountOutputType
     */
    select?: SchoolCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SchoolCountOutputType without action
   */
  export type SchoolCountOutputTypeCountClassroomsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClassroomWhereInput
  }


  /**
   * Count Type ClassroomCountOutputType
   */

  export type ClassroomCountOutputType = {
    LinkClassrooms: number
  }

  export type ClassroomCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    LinkClassrooms?: boolean | ClassroomCountOutputTypeCountLinkClassroomsArgs
  }

  // Custom InputTypes
  /**
   * ClassroomCountOutputType without action
   */
  export type ClassroomCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClassroomCountOutputType
     */
    select?: ClassroomCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ClassroomCountOutputType without action
   */
  export type ClassroomCountOutputTypeCountLinkClassroomsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LinkClassroomWhereInput
  }


  /**
   * Count Type LinkCountOutputType
   */

  export type LinkCountOutputType = {
    LinkClassroom: number
  }

  export type LinkCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    LinkClassroom?: boolean | LinkCountOutputTypeCountLinkClassroomArgs
  }

  // Custom InputTypes
  /**
   * LinkCountOutputType without action
   */
  export type LinkCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LinkCountOutputType
     */
    select?: LinkCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LinkCountOutputType without action
   */
  export type LinkCountOutputTypeCountLinkClassroomArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LinkClassroomWhereInput
  }


  /**
   * Models
   */

  /**
   * Model School
   */

  export type AggregateSchool = {
    _count: SchoolCountAggregateOutputType | null
    _avg: SchoolAvgAggregateOutputType | null
    _sum: SchoolSumAggregateOutputType | null
    _min: SchoolMinAggregateOutputType | null
    _max: SchoolMaxAggregateOutputType | null
  }

  export type SchoolAvgAggregateOutputType = {
    schoolId: number | null
  }

  export type SchoolSumAggregateOutputType = {
    schoolId: number | null
  }

  export type SchoolMinAggregateOutputType = {
    schoolId: number | null
    schoolName: string | null
  }

  export type SchoolMaxAggregateOutputType = {
    schoolId: number | null
    schoolName: string | null
  }

  export type SchoolCountAggregateOutputType = {
    schoolId: number
    schoolName: number
    _all: number
  }


  export type SchoolAvgAggregateInputType = {
    schoolId?: true
  }

  export type SchoolSumAggregateInputType = {
    schoolId?: true
  }

  export type SchoolMinAggregateInputType = {
    schoolId?: true
    schoolName?: true
  }

  export type SchoolMaxAggregateInputType = {
    schoolId?: true
    schoolName?: true
  }

  export type SchoolCountAggregateInputType = {
    schoolId?: true
    schoolName?: true
    _all?: true
  }

  export type SchoolAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which School to aggregate.
     */
    where?: SchoolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Schools to fetch.
     */
    orderBy?: SchoolOrderByWithRelationInput | SchoolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SchoolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Schools from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Schools.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Schools
    **/
    _count?: true | SchoolCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SchoolAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SchoolSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SchoolMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SchoolMaxAggregateInputType
  }

  export type GetSchoolAggregateType<T extends SchoolAggregateArgs> = {
        [P in keyof T & keyof AggregateSchool]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSchool[P]>
      : GetScalarType<T[P], AggregateSchool[P]>
  }




  export type SchoolGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SchoolWhereInput
    orderBy?: SchoolOrderByWithAggregationInput | SchoolOrderByWithAggregationInput[]
    by: SchoolScalarFieldEnum[] | SchoolScalarFieldEnum
    having?: SchoolScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SchoolCountAggregateInputType | true
    _avg?: SchoolAvgAggregateInputType
    _sum?: SchoolSumAggregateInputType
    _min?: SchoolMinAggregateInputType
    _max?: SchoolMaxAggregateInputType
  }

  export type SchoolGroupByOutputType = {
    schoolId: number
    schoolName: string
    _count: SchoolCountAggregateOutputType | null
    _avg: SchoolAvgAggregateOutputType | null
    _sum: SchoolSumAggregateOutputType | null
    _min: SchoolMinAggregateOutputType | null
    _max: SchoolMaxAggregateOutputType | null
  }

  type GetSchoolGroupByPayload<T extends SchoolGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SchoolGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SchoolGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SchoolGroupByOutputType[P]>
            : GetScalarType<T[P], SchoolGroupByOutputType[P]>
        }
      >
    >


  export type SchoolSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    schoolId?: boolean
    schoolName?: boolean
    classrooms?: boolean | School$classroomsArgs<ExtArgs>
    _count?: boolean | SchoolCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["school"]>

  export type SchoolSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    schoolId?: boolean
    schoolName?: boolean
  }, ExtArgs["result"]["school"]>

  export type SchoolSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    schoolId?: boolean
    schoolName?: boolean
  }, ExtArgs["result"]["school"]>

  export type SchoolSelectScalar = {
    schoolId?: boolean
    schoolName?: boolean
  }

  export type SchoolOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"schoolId" | "schoolName", ExtArgs["result"]["school"]>
  export type SchoolInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    classrooms?: boolean | School$classroomsArgs<ExtArgs>
    _count?: boolean | SchoolCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SchoolIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type SchoolIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $SchoolPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "School"
    objects: {
      classrooms: Prisma.$ClassroomPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      schoolId: number
      schoolName: string
    }, ExtArgs["result"]["school"]>
    composites: {}
  }

  type SchoolGetPayload<S extends boolean | null | undefined | SchoolDefaultArgs> = $Result.GetResult<Prisma.$SchoolPayload, S>

  type SchoolCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SchoolFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SchoolCountAggregateInputType | true
    }

  export interface SchoolDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['School'], meta: { name: 'School' } }
    /**
     * Find zero or one School that matches the filter.
     * @param {SchoolFindUniqueArgs} args - Arguments to find a School
     * @example
     * // Get one School
     * const school = await prisma.school.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SchoolFindUniqueArgs>(args: SelectSubset<T, SchoolFindUniqueArgs<ExtArgs>>): Prisma__SchoolClient<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one School that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SchoolFindUniqueOrThrowArgs} args - Arguments to find a School
     * @example
     * // Get one School
     * const school = await prisma.school.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SchoolFindUniqueOrThrowArgs>(args: SelectSubset<T, SchoolFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SchoolClient<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first School that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchoolFindFirstArgs} args - Arguments to find a School
     * @example
     * // Get one School
     * const school = await prisma.school.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SchoolFindFirstArgs>(args?: SelectSubset<T, SchoolFindFirstArgs<ExtArgs>>): Prisma__SchoolClient<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first School that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchoolFindFirstOrThrowArgs} args - Arguments to find a School
     * @example
     * // Get one School
     * const school = await prisma.school.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SchoolFindFirstOrThrowArgs>(args?: SelectSubset<T, SchoolFindFirstOrThrowArgs<ExtArgs>>): Prisma__SchoolClient<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Schools that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchoolFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Schools
     * const schools = await prisma.school.findMany()
     * 
     * // Get first 10 Schools
     * const schools = await prisma.school.findMany({ take: 10 })
     * 
     * // Only select the `schoolId`
     * const schoolWithSchoolIdOnly = await prisma.school.findMany({ select: { schoolId: true } })
     * 
     */
    findMany<T extends SchoolFindManyArgs>(args?: SelectSubset<T, SchoolFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a School.
     * @param {SchoolCreateArgs} args - Arguments to create a School.
     * @example
     * // Create one School
     * const School = await prisma.school.create({
     *   data: {
     *     // ... data to create a School
     *   }
     * })
     * 
     */
    create<T extends SchoolCreateArgs>(args: SelectSubset<T, SchoolCreateArgs<ExtArgs>>): Prisma__SchoolClient<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Schools.
     * @param {SchoolCreateManyArgs} args - Arguments to create many Schools.
     * @example
     * // Create many Schools
     * const school = await prisma.school.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SchoolCreateManyArgs>(args?: SelectSubset<T, SchoolCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Schools and returns the data saved in the database.
     * @param {SchoolCreateManyAndReturnArgs} args - Arguments to create many Schools.
     * @example
     * // Create many Schools
     * const school = await prisma.school.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Schools and only return the `schoolId`
     * const schoolWithSchoolIdOnly = await prisma.school.createManyAndReturn({
     *   select: { schoolId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SchoolCreateManyAndReturnArgs>(args?: SelectSubset<T, SchoolCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a School.
     * @param {SchoolDeleteArgs} args - Arguments to delete one School.
     * @example
     * // Delete one School
     * const School = await prisma.school.delete({
     *   where: {
     *     // ... filter to delete one School
     *   }
     * })
     * 
     */
    delete<T extends SchoolDeleteArgs>(args: SelectSubset<T, SchoolDeleteArgs<ExtArgs>>): Prisma__SchoolClient<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one School.
     * @param {SchoolUpdateArgs} args - Arguments to update one School.
     * @example
     * // Update one School
     * const school = await prisma.school.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SchoolUpdateArgs>(args: SelectSubset<T, SchoolUpdateArgs<ExtArgs>>): Prisma__SchoolClient<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Schools.
     * @param {SchoolDeleteManyArgs} args - Arguments to filter Schools to delete.
     * @example
     * // Delete a few Schools
     * const { count } = await prisma.school.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SchoolDeleteManyArgs>(args?: SelectSubset<T, SchoolDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Schools.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchoolUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Schools
     * const school = await prisma.school.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SchoolUpdateManyArgs>(args: SelectSubset<T, SchoolUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Schools and returns the data updated in the database.
     * @param {SchoolUpdateManyAndReturnArgs} args - Arguments to update many Schools.
     * @example
     * // Update many Schools
     * const school = await prisma.school.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Schools and only return the `schoolId`
     * const schoolWithSchoolIdOnly = await prisma.school.updateManyAndReturn({
     *   select: { schoolId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SchoolUpdateManyAndReturnArgs>(args: SelectSubset<T, SchoolUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one School.
     * @param {SchoolUpsertArgs} args - Arguments to update or create a School.
     * @example
     * // Update or create a School
     * const school = await prisma.school.upsert({
     *   create: {
     *     // ... data to create a School
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the School we want to update
     *   }
     * })
     */
    upsert<T extends SchoolUpsertArgs>(args: SelectSubset<T, SchoolUpsertArgs<ExtArgs>>): Prisma__SchoolClient<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Schools.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchoolCountArgs} args - Arguments to filter Schools to count.
     * @example
     * // Count the number of Schools
     * const count = await prisma.school.count({
     *   where: {
     *     // ... the filter for the Schools we want to count
     *   }
     * })
    **/
    count<T extends SchoolCountArgs>(
      args?: Subset<T, SchoolCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SchoolCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a School.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchoolAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SchoolAggregateArgs>(args: Subset<T, SchoolAggregateArgs>): Prisma.PrismaPromise<GetSchoolAggregateType<T>>

    /**
     * Group by School.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchoolGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SchoolGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SchoolGroupByArgs['orderBy'] }
        : { orderBy?: SchoolGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SchoolGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSchoolGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the School model
   */
  readonly fields: SchoolFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for School.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SchoolClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    classrooms<T extends School$classroomsArgs<ExtArgs> = {}>(args?: Subset<T, School$classroomsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClassroomPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the School model
   */
  interface SchoolFieldRefs {
    readonly schoolId: FieldRef<"School", 'Int'>
    readonly schoolName: FieldRef<"School", 'String'>
  }
    

  // Custom InputTypes
  /**
   * School findUnique
   */
  export type SchoolFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the School
     */
    omit?: SchoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolInclude<ExtArgs> | null
    /**
     * Filter, which School to fetch.
     */
    where: SchoolWhereUniqueInput
  }

  /**
   * School findUniqueOrThrow
   */
  export type SchoolFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the School
     */
    omit?: SchoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolInclude<ExtArgs> | null
    /**
     * Filter, which School to fetch.
     */
    where: SchoolWhereUniqueInput
  }

  /**
   * School findFirst
   */
  export type SchoolFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the School
     */
    omit?: SchoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolInclude<ExtArgs> | null
    /**
     * Filter, which School to fetch.
     */
    where?: SchoolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Schools to fetch.
     */
    orderBy?: SchoolOrderByWithRelationInput | SchoolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Schools.
     */
    cursor?: SchoolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Schools from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Schools.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Schools.
     */
    distinct?: SchoolScalarFieldEnum | SchoolScalarFieldEnum[]
  }

  /**
   * School findFirstOrThrow
   */
  export type SchoolFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the School
     */
    omit?: SchoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolInclude<ExtArgs> | null
    /**
     * Filter, which School to fetch.
     */
    where?: SchoolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Schools to fetch.
     */
    orderBy?: SchoolOrderByWithRelationInput | SchoolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Schools.
     */
    cursor?: SchoolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Schools from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Schools.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Schools.
     */
    distinct?: SchoolScalarFieldEnum | SchoolScalarFieldEnum[]
  }

  /**
   * School findMany
   */
  export type SchoolFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the School
     */
    omit?: SchoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolInclude<ExtArgs> | null
    /**
     * Filter, which Schools to fetch.
     */
    where?: SchoolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Schools to fetch.
     */
    orderBy?: SchoolOrderByWithRelationInput | SchoolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Schools.
     */
    cursor?: SchoolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Schools from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Schools.
     */
    skip?: number
    distinct?: SchoolScalarFieldEnum | SchoolScalarFieldEnum[]
  }

  /**
   * School create
   */
  export type SchoolCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the School
     */
    omit?: SchoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolInclude<ExtArgs> | null
    /**
     * The data needed to create a School.
     */
    data: XOR<SchoolCreateInput, SchoolUncheckedCreateInput>
  }

  /**
   * School createMany
   */
  export type SchoolCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Schools.
     */
    data: SchoolCreateManyInput | SchoolCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * School createManyAndReturn
   */
  export type SchoolCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the School
     */
    omit?: SchoolOmit<ExtArgs> | null
    /**
     * The data used to create many Schools.
     */
    data: SchoolCreateManyInput | SchoolCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * School update
   */
  export type SchoolUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the School
     */
    omit?: SchoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolInclude<ExtArgs> | null
    /**
     * The data needed to update a School.
     */
    data: XOR<SchoolUpdateInput, SchoolUncheckedUpdateInput>
    /**
     * Choose, which School to update.
     */
    where: SchoolWhereUniqueInput
  }

  /**
   * School updateMany
   */
  export type SchoolUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Schools.
     */
    data: XOR<SchoolUpdateManyMutationInput, SchoolUncheckedUpdateManyInput>
    /**
     * Filter which Schools to update
     */
    where?: SchoolWhereInput
    /**
     * Limit how many Schools to update.
     */
    limit?: number
  }

  /**
   * School updateManyAndReturn
   */
  export type SchoolUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the School
     */
    omit?: SchoolOmit<ExtArgs> | null
    /**
     * The data used to update Schools.
     */
    data: XOR<SchoolUpdateManyMutationInput, SchoolUncheckedUpdateManyInput>
    /**
     * Filter which Schools to update
     */
    where?: SchoolWhereInput
    /**
     * Limit how many Schools to update.
     */
    limit?: number
  }

  /**
   * School upsert
   */
  export type SchoolUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the School
     */
    omit?: SchoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolInclude<ExtArgs> | null
    /**
     * The filter to search for the School to update in case it exists.
     */
    where: SchoolWhereUniqueInput
    /**
     * In case the School found by the `where` argument doesn't exist, create a new School with this data.
     */
    create: XOR<SchoolCreateInput, SchoolUncheckedCreateInput>
    /**
     * In case the School was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SchoolUpdateInput, SchoolUncheckedUpdateInput>
  }

  /**
   * School delete
   */
  export type SchoolDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the School
     */
    omit?: SchoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolInclude<ExtArgs> | null
    /**
     * Filter which School to delete.
     */
    where: SchoolWhereUniqueInput
  }

  /**
   * School deleteMany
   */
  export type SchoolDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Schools to delete
     */
    where?: SchoolWhereInput
    /**
     * Limit how many Schools to delete.
     */
    limit?: number
  }

  /**
   * School.classrooms
   */
  export type School$classroomsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classroom
     */
    select?: ClassroomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Classroom
     */
    omit?: ClassroomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassroomInclude<ExtArgs> | null
    where?: ClassroomWhereInput
    orderBy?: ClassroomOrderByWithRelationInput | ClassroomOrderByWithRelationInput[]
    cursor?: ClassroomWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ClassroomScalarFieldEnum | ClassroomScalarFieldEnum[]
  }

  /**
   * School without action
   */
  export type SchoolDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the School
     */
    omit?: SchoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolInclude<ExtArgs> | null
  }


  /**
   * Model Classroom
   */

  export type AggregateClassroom = {
    _count: ClassroomCountAggregateOutputType | null
    _avg: ClassroomAvgAggregateOutputType | null
    _sum: ClassroomSumAggregateOutputType | null
    _min: ClassroomMinAggregateOutputType | null
    _max: ClassroomMaxAggregateOutputType | null
  }

  export type ClassroomAvgAggregateOutputType = {
    classroomId: number | null
    classroomNumber: number | null
    classroomOrder: number | null
    schoolId: number | null
  }

  export type ClassroomSumAggregateOutputType = {
    classroomId: number | null
    classroomNumber: number | null
    classroomOrder: number | null
    schoolId: number | null
  }

  export type ClassroomMinAggregateOutputType = {
    classroomId: number | null
    classroomNumber: number | null
    classroomOrder: number | null
    classroomBorderColor: string | null
    classroomBackgroundColor: string | null
    classroomColor: string | null
    schoolId: number | null
  }

  export type ClassroomMaxAggregateOutputType = {
    classroomId: number | null
    classroomNumber: number | null
    classroomOrder: number | null
    classroomBorderColor: string | null
    classroomBackgroundColor: string | null
    classroomColor: string | null
    schoolId: number | null
  }

  export type ClassroomCountAggregateOutputType = {
    classroomId: number
    classroomNumber: number
    classroomOrder: number
    classroomBorderColor: number
    classroomBackgroundColor: number
    classroomColor: number
    schoolId: number
    _all: number
  }


  export type ClassroomAvgAggregateInputType = {
    classroomId?: true
    classroomNumber?: true
    classroomOrder?: true
    schoolId?: true
  }

  export type ClassroomSumAggregateInputType = {
    classroomId?: true
    classroomNumber?: true
    classroomOrder?: true
    schoolId?: true
  }

  export type ClassroomMinAggregateInputType = {
    classroomId?: true
    classroomNumber?: true
    classroomOrder?: true
    classroomBorderColor?: true
    classroomBackgroundColor?: true
    classroomColor?: true
    schoolId?: true
  }

  export type ClassroomMaxAggregateInputType = {
    classroomId?: true
    classroomNumber?: true
    classroomOrder?: true
    classroomBorderColor?: true
    classroomBackgroundColor?: true
    classroomColor?: true
    schoolId?: true
  }

  export type ClassroomCountAggregateInputType = {
    classroomId?: true
    classroomNumber?: true
    classroomOrder?: true
    classroomBorderColor?: true
    classroomBackgroundColor?: true
    classroomColor?: true
    schoolId?: true
    _all?: true
  }

  export type ClassroomAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Classroom to aggregate.
     */
    where?: ClassroomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Classrooms to fetch.
     */
    orderBy?: ClassroomOrderByWithRelationInput | ClassroomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClassroomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Classrooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Classrooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Classrooms
    **/
    _count?: true | ClassroomCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ClassroomAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ClassroomSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClassroomMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClassroomMaxAggregateInputType
  }

  export type GetClassroomAggregateType<T extends ClassroomAggregateArgs> = {
        [P in keyof T & keyof AggregateClassroom]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClassroom[P]>
      : GetScalarType<T[P], AggregateClassroom[P]>
  }




  export type ClassroomGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClassroomWhereInput
    orderBy?: ClassroomOrderByWithAggregationInput | ClassroomOrderByWithAggregationInput[]
    by: ClassroomScalarFieldEnum[] | ClassroomScalarFieldEnum
    having?: ClassroomScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClassroomCountAggregateInputType | true
    _avg?: ClassroomAvgAggregateInputType
    _sum?: ClassroomSumAggregateInputType
    _min?: ClassroomMinAggregateInputType
    _max?: ClassroomMaxAggregateInputType
  }

  export type ClassroomGroupByOutputType = {
    classroomId: number
    classroomNumber: number
    classroomOrder: number
    classroomBorderColor: string
    classroomBackgroundColor: string
    classroomColor: string
    schoolId: number | null
    _count: ClassroomCountAggregateOutputType | null
    _avg: ClassroomAvgAggregateOutputType | null
    _sum: ClassroomSumAggregateOutputType | null
    _min: ClassroomMinAggregateOutputType | null
    _max: ClassroomMaxAggregateOutputType | null
  }

  type GetClassroomGroupByPayload<T extends ClassroomGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClassroomGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClassroomGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClassroomGroupByOutputType[P]>
            : GetScalarType<T[P], ClassroomGroupByOutputType[P]>
        }
      >
    >


  export type ClassroomSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    classroomId?: boolean
    classroomNumber?: boolean
    classroomOrder?: boolean
    classroomBorderColor?: boolean
    classroomBackgroundColor?: boolean
    classroomColor?: boolean
    schoolId?: boolean
    school?: boolean | Classroom$schoolArgs<ExtArgs>
    LinkClassrooms?: boolean | Classroom$LinkClassroomsArgs<ExtArgs>
    _count?: boolean | ClassroomCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["classroom"]>

  export type ClassroomSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    classroomId?: boolean
    classroomNumber?: boolean
    classroomOrder?: boolean
    classroomBorderColor?: boolean
    classroomBackgroundColor?: boolean
    classroomColor?: boolean
    schoolId?: boolean
    school?: boolean | Classroom$schoolArgs<ExtArgs>
  }, ExtArgs["result"]["classroom"]>

  export type ClassroomSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    classroomId?: boolean
    classroomNumber?: boolean
    classroomOrder?: boolean
    classroomBorderColor?: boolean
    classroomBackgroundColor?: boolean
    classroomColor?: boolean
    schoolId?: boolean
    school?: boolean | Classroom$schoolArgs<ExtArgs>
  }, ExtArgs["result"]["classroom"]>

  export type ClassroomSelectScalar = {
    classroomId?: boolean
    classroomNumber?: boolean
    classroomOrder?: boolean
    classroomBorderColor?: boolean
    classroomBackgroundColor?: boolean
    classroomColor?: boolean
    schoolId?: boolean
  }

  export type ClassroomOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"classroomId" | "classroomNumber" | "classroomOrder" | "classroomBorderColor" | "classroomBackgroundColor" | "classroomColor" | "schoolId", ExtArgs["result"]["classroom"]>
  export type ClassroomInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    school?: boolean | Classroom$schoolArgs<ExtArgs>
    LinkClassrooms?: boolean | Classroom$LinkClassroomsArgs<ExtArgs>
    _count?: boolean | ClassroomCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ClassroomIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    school?: boolean | Classroom$schoolArgs<ExtArgs>
  }
  export type ClassroomIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    school?: boolean | Classroom$schoolArgs<ExtArgs>
  }

  export type $ClassroomPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Classroom"
    objects: {
      school: Prisma.$SchoolPayload<ExtArgs> | null
      LinkClassrooms: Prisma.$LinkClassroomPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      classroomId: number
      classroomNumber: number
      classroomOrder: number
      classroomBorderColor: string
      classroomBackgroundColor: string
      classroomColor: string
      schoolId: number | null
    }, ExtArgs["result"]["classroom"]>
    composites: {}
  }

  type ClassroomGetPayload<S extends boolean | null | undefined | ClassroomDefaultArgs> = $Result.GetResult<Prisma.$ClassroomPayload, S>

  type ClassroomCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ClassroomFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClassroomCountAggregateInputType | true
    }

  export interface ClassroomDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Classroom'], meta: { name: 'Classroom' } }
    /**
     * Find zero or one Classroom that matches the filter.
     * @param {ClassroomFindUniqueArgs} args - Arguments to find a Classroom
     * @example
     * // Get one Classroom
     * const classroom = await prisma.classroom.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClassroomFindUniqueArgs>(args: SelectSubset<T, ClassroomFindUniqueArgs<ExtArgs>>): Prisma__ClassroomClient<$Result.GetResult<Prisma.$ClassroomPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Classroom that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClassroomFindUniqueOrThrowArgs} args - Arguments to find a Classroom
     * @example
     * // Get one Classroom
     * const classroom = await prisma.classroom.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClassroomFindUniqueOrThrowArgs>(args: SelectSubset<T, ClassroomFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClassroomClient<$Result.GetResult<Prisma.$ClassroomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Classroom that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassroomFindFirstArgs} args - Arguments to find a Classroom
     * @example
     * // Get one Classroom
     * const classroom = await prisma.classroom.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClassroomFindFirstArgs>(args?: SelectSubset<T, ClassroomFindFirstArgs<ExtArgs>>): Prisma__ClassroomClient<$Result.GetResult<Prisma.$ClassroomPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Classroom that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassroomFindFirstOrThrowArgs} args - Arguments to find a Classroom
     * @example
     * // Get one Classroom
     * const classroom = await prisma.classroom.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClassroomFindFirstOrThrowArgs>(args?: SelectSubset<T, ClassroomFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClassroomClient<$Result.GetResult<Prisma.$ClassroomPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Classrooms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassroomFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Classrooms
     * const classrooms = await prisma.classroom.findMany()
     * 
     * // Get first 10 Classrooms
     * const classrooms = await prisma.classroom.findMany({ take: 10 })
     * 
     * // Only select the `classroomId`
     * const classroomWithClassroomIdOnly = await prisma.classroom.findMany({ select: { classroomId: true } })
     * 
     */
    findMany<T extends ClassroomFindManyArgs>(args?: SelectSubset<T, ClassroomFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClassroomPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Classroom.
     * @param {ClassroomCreateArgs} args - Arguments to create a Classroom.
     * @example
     * // Create one Classroom
     * const Classroom = await prisma.classroom.create({
     *   data: {
     *     // ... data to create a Classroom
     *   }
     * })
     * 
     */
    create<T extends ClassroomCreateArgs>(args: SelectSubset<T, ClassroomCreateArgs<ExtArgs>>): Prisma__ClassroomClient<$Result.GetResult<Prisma.$ClassroomPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Classrooms.
     * @param {ClassroomCreateManyArgs} args - Arguments to create many Classrooms.
     * @example
     * // Create many Classrooms
     * const classroom = await prisma.classroom.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClassroomCreateManyArgs>(args?: SelectSubset<T, ClassroomCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Classrooms and returns the data saved in the database.
     * @param {ClassroomCreateManyAndReturnArgs} args - Arguments to create many Classrooms.
     * @example
     * // Create many Classrooms
     * const classroom = await prisma.classroom.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Classrooms and only return the `classroomId`
     * const classroomWithClassroomIdOnly = await prisma.classroom.createManyAndReturn({
     *   select: { classroomId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClassroomCreateManyAndReturnArgs>(args?: SelectSubset<T, ClassroomCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClassroomPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Classroom.
     * @param {ClassroomDeleteArgs} args - Arguments to delete one Classroom.
     * @example
     * // Delete one Classroom
     * const Classroom = await prisma.classroom.delete({
     *   where: {
     *     // ... filter to delete one Classroom
     *   }
     * })
     * 
     */
    delete<T extends ClassroomDeleteArgs>(args: SelectSubset<T, ClassroomDeleteArgs<ExtArgs>>): Prisma__ClassroomClient<$Result.GetResult<Prisma.$ClassroomPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Classroom.
     * @param {ClassroomUpdateArgs} args - Arguments to update one Classroom.
     * @example
     * // Update one Classroom
     * const classroom = await prisma.classroom.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClassroomUpdateArgs>(args: SelectSubset<T, ClassroomUpdateArgs<ExtArgs>>): Prisma__ClassroomClient<$Result.GetResult<Prisma.$ClassroomPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Classrooms.
     * @param {ClassroomDeleteManyArgs} args - Arguments to filter Classrooms to delete.
     * @example
     * // Delete a few Classrooms
     * const { count } = await prisma.classroom.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClassroomDeleteManyArgs>(args?: SelectSubset<T, ClassroomDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Classrooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassroomUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Classrooms
     * const classroom = await prisma.classroom.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClassroomUpdateManyArgs>(args: SelectSubset<T, ClassroomUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Classrooms and returns the data updated in the database.
     * @param {ClassroomUpdateManyAndReturnArgs} args - Arguments to update many Classrooms.
     * @example
     * // Update many Classrooms
     * const classroom = await prisma.classroom.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Classrooms and only return the `classroomId`
     * const classroomWithClassroomIdOnly = await prisma.classroom.updateManyAndReturn({
     *   select: { classroomId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ClassroomUpdateManyAndReturnArgs>(args: SelectSubset<T, ClassroomUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClassroomPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Classroom.
     * @param {ClassroomUpsertArgs} args - Arguments to update or create a Classroom.
     * @example
     * // Update or create a Classroom
     * const classroom = await prisma.classroom.upsert({
     *   create: {
     *     // ... data to create a Classroom
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Classroom we want to update
     *   }
     * })
     */
    upsert<T extends ClassroomUpsertArgs>(args: SelectSubset<T, ClassroomUpsertArgs<ExtArgs>>): Prisma__ClassroomClient<$Result.GetResult<Prisma.$ClassroomPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Classrooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassroomCountArgs} args - Arguments to filter Classrooms to count.
     * @example
     * // Count the number of Classrooms
     * const count = await prisma.classroom.count({
     *   where: {
     *     // ... the filter for the Classrooms we want to count
     *   }
     * })
    **/
    count<T extends ClassroomCountArgs>(
      args?: Subset<T, ClassroomCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClassroomCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Classroom.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassroomAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ClassroomAggregateArgs>(args: Subset<T, ClassroomAggregateArgs>): Prisma.PrismaPromise<GetClassroomAggregateType<T>>

    /**
     * Group by Classroom.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassroomGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ClassroomGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClassroomGroupByArgs['orderBy'] }
        : { orderBy?: ClassroomGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ClassroomGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClassroomGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Classroom model
   */
  readonly fields: ClassroomFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Classroom.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClassroomClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    school<T extends Classroom$schoolArgs<ExtArgs> = {}>(args?: Subset<T, Classroom$schoolArgs<ExtArgs>>): Prisma__SchoolClient<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    LinkClassrooms<T extends Classroom$LinkClassroomsArgs<ExtArgs> = {}>(args?: Subset<T, Classroom$LinkClassroomsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LinkClassroomPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Classroom model
   */
  interface ClassroomFieldRefs {
    readonly classroomId: FieldRef<"Classroom", 'Int'>
    readonly classroomNumber: FieldRef<"Classroom", 'Int'>
    readonly classroomOrder: FieldRef<"Classroom", 'Int'>
    readonly classroomBorderColor: FieldRef<"Classroom", 'String'>
    readonly classroomBackgroundColor: FieldRef<"Classroom", 'String'>
    readonly classroomColor: FieldRef<"Classroom", 'String'>
    readonly schoolId: FieldRef<"Classroom", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Classroom findUnique
   */
  export type ClassroomFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classroom
     */
    select?: ClassroomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Classroom
     */
    omit?: ClassroomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassroomInclude<ExtArgs> | null
    /**
     * Filter, which Classroom to fetch.
     */
    where: ClassroomWhereUniqueInput
  }

  /**
   * Classroom findUniqueOrThrow
   */
  export type ClassroomFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classroom
     */
    select?: ClassroomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Classroom
     */
    omit?: ClassroomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassroomInclude<ExtArgs> | null
    /**
     * Filter, which Classroom to fetch.
     */
    where: ClassroomWhereUniqueInput
  }

  /**
   * Classroom findFirst
   */
  export type ClassroomFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classroom
     */
    select?: ClassroomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Classroom
     */
    omit?: ClassroomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassroomInclude<ExtArgs> | null
    /**
     * Filter, which Classroom to fetch.
     */
    where?: ClassroomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Classrooms to fetch.
     */
    orderBy?: ClassroomOrderByWithRelationInput | ClassroomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Classrooms.
     */
    cursor?: ClassroomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Classrooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Classrooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Classrooms.
     */
    distinct?: ClassroomScalarFieldEnum | ClassroomScalarFieldEnum[]
  }

  /**
   * Classroom findFirstOrThrow
   */
  export type ClassroomFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classroom
     */
    select?: ClassroomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Classroom
     */
    omit?: ClassroomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassroomInclude<ExtArgs> | null
    /**
     * Filter, which Classroom to fetch.
     */
    where?: ClassroomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Classrooms to fetch.
     */
    orderBy?: ClassroomOrderByWithRelationInput | ClassroomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Classrooms.
     */
    cursor?: ClassroomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Classrooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Classrooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Classrooms.
     */
    distinct?: ClassroomScalarFieldEnum | ClassroomScalarFieldEnum[]
  }

  /**
   * Classroom findMany
   */
  export type ClassroomFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classroom
     */
    select?: ClassroomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Classroom
     */
    omit?: ClassroomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassroomInclude<ExtArgs> | null
    /**
     * Filter, which Classrooms to fetch.
     */
    where?: ClassroomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Classrooms to fetch.
     */
    orderBy?: ClassroomOrderByWithRelationInput | ClassroomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Classrooms.
     */
    cursor?: ClassroomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Classrooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Classrooms.
     */
    skip?: number
    distinct?: ClassroomScalarFieldEnum | ClassroomScalarFieldEnum[]
  }

  /**
   * Classroom create
   */
  export type ClassroomCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classroom
     */
    select?: ClassroomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Classroom
     */
    omit?: ClassroomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassroomInclude<ExtArgs> | null
    /**
     * The data needed to create a Classroom.
     */
    data: XOR<ClassroomCreateInput, ClassroomUncheckedCreateInput>
  }

  /**
   * Classroom createMany
   */
  export type ClassroomCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Classrooms.
     */
    data: ClassroomCreateManyInput | ClassroomCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Classroom createManyAndReturn
   */
  export type ClassroomCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classroom
     */
    select?: ClassroomSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Classroom
     */
    omit?: ClassroomOmit<ExtArgs> | null
    /**
     * The data used to create many Classrooms.
     */
    data: ClassroomCreateManyInput | ClassroomCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassroomIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Classroom update
   */
  export type ClassroomUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classroom
     */
    select?: ClassroomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Classroom
     */
    omit?: ClassroomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassroomInclude<ExtArgs> | null
    /**
     * The data needed to update a Classroom.
     */
    data: XOR<ClassroomUpdateInput, ClassroomUncheckedUpdateInput>
    /**
     * Choose, which Classroom to update.
     */
    where: ClassroomWhereUniqueInput
  }

  /**
   * Classroom updateMany
   */
  export type ClassroomUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Classrooms.
     */
    data: XOR<ClassroomUpdateManyMutationInput, ClassroomUncheckedUpdateManyInput>
    /**
     * Filter which Classrooms to update
     */
    where?: ClassroomWhereInput
    /**
     * Limit how many Classrooms to update.
     */
    limit?: number
  }

  /**
   * Classroom updateManyAndReturn
   */
  export type ClassroomUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classroom
     */
    select?: ClassroomSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Classroom
     */
    omit?: ClassroomOmit<ExtArgs> | null
    /**
     * The data used to update Classrooms.
     */
    data: XOR<ClassroomUpdateManyMutationInput, ClassroomUncheckedUpdateManyInput>
    /**
     * Filter which Classrooms to update
     */
    where?: ClassroomWhereInput
    /**
     * Limit how many Classrooms to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassroomIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Classroom upsert
   */
  export type ClassroomUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classroom
     */
    select?: ClassroomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Classroom
     */
    omit?: ClassroomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassroomInclude<ExtArgs> | null
    /**
     * The filter to search for the Classroom to update in case it exists.
     */
    where: ClassroomWhereUniqueInput
    /**
     * In case the Classroom found by the `where` argument doesn't exist, create a new Classroom with this data.
     */
    create: XOR<ClassroomCreateInput, ClassroomUncheckedCreateInput>
    /**
     * In case the Classroom was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClassroomUpdateInput, ClassroomUncheckedUpdateInput>
  }

  /**
   * Classroom delete
   */
  export type ClassroomDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classroom
     */
    select?: ClassroomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Classroom
     */
    omit?: ClassroomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassroomInclude<ExtArgs> | null
    /**
     * Filter which Classroom to delete.
     */
    where: ClassroomWhereUniqueInput
  }

  /**
   * Classroom deleteMany
   */
  export type ClassroomDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Classrooms to delete
     */
    where?: ClassroomWhereInput
    /**
     * Limit how many Classrooms to delete.
     */
    limit?: number
  }

  /**
   * Classroom.school
   */
  export type Classroom$schoolArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the School
     */
    omit?: SchoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolInclude<ExtArgs> | null
    where?: SchoolWhereInput
  }

  /**
   * Classroom.LinkClassrooms
   */
  export type Classroom$LinkClassroomsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LinkClassroom
     */
    select?: LinkClassroomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LinkClassroom
     */
    omit?: LinkClassroomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkClassroomInclude<ExtArgs> | null
    where?: LinkClassroomWhereInput
    orderBy?: LinkClassroomOrderByWithRelationInput | LinkClassroomOrderByWithRelationInput[]
    cursor?: LinkClassroomWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LinkClassroomScalarFieldEnum | LinkClassroomScalarFieldEnum[]
  }

  /**
   * Classroom without action
   */
  export type ClassroomDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classroom
     */
    select?: ClassroomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Classroom
     */
    omit?: ClassroomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassroomInclude<ExtArgs> | null
  }


  /**
   * Model Link
   */

  export type AggregateLink = {
    _count: LinkCountAggregateOutputType | null
    _avg: LinkAvgAggregateOutputType | null
    _sum: LinkSumAggregateOutputType | null
    _min: LinkMinAggregateOutputType | null
    _max: LinkMaxAggregateOutputType | null
  }

  export type LinkAvgAggregateOutputType = {
    linkId: number | null
  }

  export type LinkSumAggregateOutputType = {
    linkId: number | null
  }

  export type LinkMinAggregateOutputType = {
    linkId: number | null
    linkName: string | null
    linkTitleFr: string | null
    linkTitleBr: string | null
    linkFullNameFr: string | null
    linkFullNameBr: string | null
    linkRedirection: string | null
    linkIcon: string | null
    linkMatter: string | null
    linkDescriptionFr: string | null
    linkDescriptionBr: string | null
    linkType: string | null
  }

  export type LinkMaxAggregateOutputType = {
    linkId: number | null
    linkName: string | null
    linkTitleFr: string | null
    linkTitleBr: string | null
    linkFullNameFr: string | null
    linkFullNameBr: string | null
    linkRedirection: string | null
    linkIcon: string | null
    linkMatter: string | null
    linkDescriptionFr: string | null
    linkDescriptionBr: string | null
    linkType: string | null
  }

  export type LinkCountAggregateOutputType = {
    linkId: number
    linkName: number
    linkTitleFr: number
    linkTitleBr: number
    linkFullNameFr: number
    linkFullNameBr: number
    linkRedirection: number
    linkIcon: number
    linkMatter: number
    linkDescriptionFr: number
    linkDescriptionBr: number
    linkType: number
    _all: number
  }


  export type LinkAvgAggregateInputType = {
    linkId?: true
  }

  export type LinkSumAggregateInputType = {
    linkId?: true
  }

  export type LinkMinAggregateInputType = {
    linkId?: true
    linkName?: true
    linkTitleFr?: true
    linkTitleBr?: true
    linkFullNameFr?: true
    linkFullNameBr?: true
    linkRedirection?: true
    linkIcon?: true
    linkMatter?: true
    linkDescriptionFr?: true
    linkDescriptionBr?: true
    linkType?: true
  }

  export type LinkMaxAggregateInputType = {
    linkId?: true
    linkName?: true
    linkTitleFr?: true
    linkTitleBr?: true
    linkFullNameFr?: true
    linkFullNameBr?: true
    linkRedirection?: true
    linkIcon?: true
    linkMatter?: true
    linkDescriptionFr?: true
    linkDescriptionBr?: true
    linkType?: true
  }

  export type LinkCountAggregateInputType = {
    linkId?: true
    linkName?: true
    linkTitleFr?: true
    linkTitleBr?: true
    linkFullNameFr?: true
    linkFullNameBr?: true
    linkRedirection?: true
    linkIcon?: true
    linkMatter?: true
    linkDescriptionFr?: true
    linkDescriptionBr?: true
    linkType?: true
    _all?: true
  }

  export type LinkAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Link to aggregate.
     */
    where?: LinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Links to fetch.
     */
    orderBy?: LinkOrderByWithRelationInput | LinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Links from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Links.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Links
    **/
    _count?: true | LinkCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LinkAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LinkSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LinkMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LinkMaxAggregateInputType
  }

  export type GetLinkAggregateType<T extends LinkAggregateArgs> = {
        [P in keyof T & keyof AggregateLink]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLink[P]>
      : GetScalarType<T[P], AggregateLink[P]>
  }




  export type LinkGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LinkWhereInput
    orderBy?: LinkOrderByWithAggregationInput | LinkOrderByWithAggregationInput[]
    by: LinkScalarFieldEnum[] | LinkScalarFieldEnum
    having?: LinkScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LinkCountAggregateInputType | true
    _avg?: LinkAvgAggregateInputType
    _sum?: LinkSumAggregateInputType
    _min?: LinkMinAggregateInputType
    _max?: LinkMaxAggregateInputType
  }

  export type LinkGroupByOutputType = {
    linkId: number
    linkName: string
    linkTitleFr: string | null
    linkTitleBr: string | null
    linkFullNameFr: string | null
    linkFullNameBr: string | null
    linkRedirection: string
    linkIcon: string
    linkMatter: string
    linkDescriptionFr: string | null
    linkDescriptionBr: string | null
    linkType: string
    _count: LinkCountAggregateOutputType | null
    _avg: LinkAvgAggregateOutputType | null
    _sum: LinkSumAggregateOutputType | null
    _min: LinkMinAggregateOutputType | null
    _max: LinkMaxAggregateOutputType | null
  }

  type GetLinkGroupByPayload<T extends LinkGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LinkGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LinkGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LinkGroupByOutputType[P]>
            : GetScalarType<T[P], LinkGroupByOutputType[P]>
        }
      >
    >


  export type LinkSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    linkId?: boolean
    linkName?: boolean
    linkTitleFr?: boolean
    linkTitleBr?: boolean
    linkFullNameFr?: boolean
    linkFullNameBr?: boolean
    linkRedirection?: boolean
    linkIcon?: boolean
    linkMatter?: boolean
    linkDescriptionFr?: boolean
    linkDescriptionBr?: boolean
    linkType?: boolean
    LinkClassroom?: boolean | Link$LinkClassroomArgs<ExtArgs>
    _count?: boolean | LinkCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["link"]>

  export type LinkSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    linkId?: boolean
    linkName?: boolean
    linkTitleFr?: boolean
    linkTitleBr?: boolean
    linkFullNameFr?: boolean
    linkFullNameBr?: boolean
    linkRedirection?: boolean
    linkIcon?: boolean
    linkMatter?: boolean
    linkDescriptionFr?: boolean
    linkDescriptionBr?: boolean
    linkType?: boolean
  }, ExtArgs["result"]["link"]>

  export type LinkSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    linkId?: boolean
    linkName?: boolean
    linkTitleFr?: boolean
    linkTitleBr?: boolean
    linkFullNameFr?: boolean
    linkFullNameBr?: boolean
    linkRedirection?: boolean
    linkIcon?: boolean
    linkMatter?: boolean
    linkDescriptionFr?: boolean
    linkDescriptionBr?: boolean
    linkType?: boolean
  }, ExtArgs["result"]["link"]>

  export type LinkSelectScalar = {
    linkId?: boolean
    linkName?: boolean
    linkTitleFr?: boolean
    linkTitleBr?: boolean
    linkFullNameFr?: boolean
    linkFullNameBr?: boolean
    linkRedirection?: boolean
    linkIcon?: boolean
    linkMatter?: boolean
    linkDescriptionFr?: boolean
    linkDescriptionBr?: boolean
    linkType?: boolean
  }

  export type LinkOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"linkId" | "linkName" | "linkTitleFr" | "linkTitleBr" | "linkFullNameFr" | "linkFullNameBr" | "linkRedirection" | "linkIcon" | "linkMatter" | "linkDescriptionFr" | "linkDescriptionBr" | "linkType", ExtArgs["result"]["link"]>
  export type LinkInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    LinkClassroom?: boolean | Link$LinkClassroomArgs<ExtArgs>
    _count?: boolean | LinkCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type LinkIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type LinkIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $LinkPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Link"
    objects: {
      LinkClassroom: Prisma.$LinkClassroomPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      linkId: number
      linkName: string
      linkTitleFr: string | null
      linkTitleBr: string | null
      linkFullNameFr: string | null
      linkFullNameBr: string | null
      linkRedirection: string
      linkIcon: string
      linkMatter: string
      linkDescriptionFr: string | null
      linkDescriptionBr: string | null
      linkType: string
    }, ExtArgs["result"]["link"]>
    composites: {}
  }

  type LinkGetPayload<S extends boolean | null | undefined | LinkDefaultArgs> = $Result.GetResult<Prisma.$LinkPayload, S>

  type LinkCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LinkFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LinkCountAggregateInputType | true
    }

  export interface LinkDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Link'], meta: { name: 'Link' } }
    /**
     * Find zero or one Link that matches the filter.
     * @param {LinkFindUniqueArgs} args - Arguments to find a Link
     * @example
     * // Get one Link
     * const link = await prisma.link.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LinkFindUniqueArgs>(args: SelectSubset<T, LinkFindUniqueArgs<ExtArgs>>): Prisma__LinkClient<$Result.GetResult<Prisma.$LinkPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Link that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LinkFindUniqueOrThrowArgs} args - Arguments to find a Link
     * @example
     * // Get one Link
     * const link = await prisma.link.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LinkFindUniqueOrThrowArgs>(args: SelectSubset<T, LinkFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LinkClient<$Result.GetResult<Prisma.$LinkPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Link that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LinkFindFirstArgs} args - Arguments to find a Link
     * @example
     * // Get one Link
     * const link = await prisma.link.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LinkFindFirstArgs>(args?: SelectSubset<T, LinkFindFirstArgs<ExtArgs>>): Prisma__LinkClient<$Result.GetResult<Prisma.$LinkPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Link that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LinkFindFirstOrThrowArgs} args - Arguments to find a Link
     * @example
     * // Get one Link
     * const link = await prisma.link.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LinkFindFirstOrThrowArgs>(args?: SelectSubset<T, LinkFindFirstOrThrowArgs<ExtArgs>>): Prisma__LinkClient<$Result.GetResult<Prisma.$LinkPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Links that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LinkFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Links
     * const links = await prisma.link.findMany()
     * 
     * // Get first 10 Links
     * const links = await prisma.link.findMany({ take: 10 })
     * 
     * // Only select the `linkId`
     * const linkWithLinkIdOnly = await prisma.link.findMany({ select: { linkId: true } })
     * 
     */
    findMany<T extends LinkFindManyArgs>(args?: SelectSubset<T, LinkFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LinkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Link.
     * @param {LinkCreateArgs} args - Arguments to create a Link.
     * @example
     * // Create one Link
     * const Link = await prisma.link.create({
     *   data: {
     *     // ... data to create a Link
     *   }
     * })
     * 
     */
    create<T extends LinkCreateArgs>(args: SelectSubset<T, LinkCreateArgs<ExtArgs>>): Prisma__LinkClient<$Result.GetResult<Prisma.$LinkPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Links.
     * @param {LinkCreateManyArgs} args - Arguments to create many Links.
     * @example
     * // Create many Links
     * const link = await prisma.link.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LinkCreateManyArgs>(args?: SelectSubset<T, LinkCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Links and returns the data saved in the database.
     * @param {LinkCreateManyAndReturnArgs} args - Arguments to create many Links.
     * @example
     * // Create many Links
     * const link = await prisma.link.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Links and only return the `linkId`
     * const linkWithLinkIdOnly = await prisma.link.createManyAndReturn({
     *   select: { linkId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LinkCreateManyAndReturnArgs>(args?: SelectSubset<T, LinkCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LinkPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Link.
     * @param {LinkDeleteArgs} args - Arguments to delete one Link.
     * @example
     * // Delete one Link
     * const Link = await prisma.link.delete({
     *   where: {
     *     // ... filter to delete one Link
     *   }
     * })
     * 
     */
    delete<T extends LinkDeleteArgs>(args: SelectSubset<T, LinkDeleteArgs<ExtArgs>>): Prisma__LinkClient<$Result.GetResult<Prisma.$LinkPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Link.
     * @param {LinkUpdateArgs} args - Arguments to update one Link.
     * @example
     * // Update one Link
     * const link = await prisma.link.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LinkUpdateArgs>(args: SelectSubset<T, LinkUpdateArgs<ExtArgs>>): Prisma__LinkClient<$Result.GetResult<Prisma.$LinkPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Links.
     * @param {LinkDeleteManyArgs} args - Arguments to filter Links to delete.
     * @example
     * // Delete a few Links
     * const { count } = await prisma.link.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LinkDeleteManyArgs>(args?: SelectSubset<T, LinkDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Links.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LinkUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Links
     * const link = await prisma.link.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LinkUpdateManyArgs>(args: SelectSubset<T, LinkUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Links and returns the data updated in the database.
     * @param {LinkUpdateManyAndReturnArgs} args - Arguments to update many Links.
     * @example
     * // Update many Links
     * const link = await prisma.link.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Links and only return the `linkId`
     * const linkWithLinkIdOnly = await prisma.link.updateManyAndReturn({
     *   select: { linkId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LinkUpdateManyAndReturnArgs>(args: SelectSubset<T, LinkUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LinkPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Link.
     * @param {LinkUpsertArgs} args - Arguments to update or create a Link.
     * @example
     * // Update or create a Link
     * const link = await prisma.link.upsert({
     *   create: {
     *     // ... data to create a Link
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Link we want to update
     *   }
     * })
     */
    upsert<T extends LinkUpsertArgs>(args: SelectSubset<T, LinkUpsertArgs<ExtArgs>>): Prisma__LinkClient<$Result.GetResult<Prisma.$LinkPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Links.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LinkCountArgs} args - Arguments to filter Links to count.
     * @example
     * // Count the number of Links
     * const count = await prisma.link.count({
     *   where: {
     *     // ... the filter for the Links we want to count
     *   }
     * })
    **/
    count<T extends LinkCountArgs>(
      args?: Subset<T, LinkCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LinkCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Link.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LinkAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LinkAggregateArgs>(args: Subset<T, LinkAggregateArgs>): Prisma.PrismaPromise<GetLinkAggregateType<T>>

    /**
     * Group by Link.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LinkGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LinkGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LinkGroupByArgs['orderBy'] }
        : { orderBy?: LinkGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LinkGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLinkGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Link model
   */
  readonly fields: LinkFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Link.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LinkClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    LinkClassroom<T extends Link$LinkClassroomArgs<ExtArgs> = {}>(args?: Subset<T, Link$LinkClassroomArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LinkClassroomPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Link model
   */
  interface LinkFieldRefs {
    readonly linkId: FieldRef<"Link", 'Int'>
    readonly linkName: FieldRef<"Link", 'String'>
    readonly linkTitleFr: FieldRef<"Link", 'String'>
    readonly linkTitleBr: FieldRef<"Link", 'String'>
    readonly linkFullNameFr: FieldRef<"Link", 'String'>
    readonly linkFullNameBr: FieldRef<"Link", 'String'>
    readonly linkRedirection: FieldRef<"Link", 'String'>
    readonly linkIcon: FieldRef<"Link", 'String'>
    readonly linkMatter: FieldRef<"Link", 'String'>
    readonly linkDescriptionFr: FieldRef<"Link", 'String'>
    readonly linkDescriptionBr: FieldRef<"Link", 'String'>
    readonly linkType: FieldRef<"Link", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Link findUnique
   */
  export type LinkFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Link
     */
    select?: LinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Link
     */
    omit?: LinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkInclude<ExtArgs> | null
    /**
     * Filter, which Link to fetch.
     */
    where: LinkWhereUniqueInput
  }

  /**
   * Link findUniqueOrThrow
   */
  export type LinkFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Link
     */
    select?: LinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Link
     */
    omit?: LinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkInclude<ExtArgs> | null
    /**
     * Filter, which Link to fetch.
     */
    where: LinkWhereUniqueInput
  }

  /**
   * Link findFirst
   */
  export type LinkFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Link
     */
    select?: LinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Link
     */
    omit?: LinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkInclude<ExtArgs> | null
    /**
     * Filter, which Link to fetch.
     */
    where?: LinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Links to fetch.
     */
    orderBy?: LinkOrderByWithRelationInput | LinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Links.
     */
    cursor?: LinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Links from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Links.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Links.
     */
    distinct?: LinkScalarFieldEnum | LinkScalarFieldEnum[]
  }

  /**
   * Link findFirstOrThrow
   */
  export type LinkFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Link
     */
    select?: LinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Link
     */
    omit?: LinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkInclude<ExtArgs> | null
    /**
     * Filter, which Link to fetch.
     */
    where?: LinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Links to fetch.
     */
    orderBy?: LinkOrderByWithRelationInput | LinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Links.
     */
    cursor?: LinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Links from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Links.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Links.
     */
    distinct?: LinkScalarFieldEnum | LinkScalarFieldEnum[]
  }

  /**
   * Link findMany
   */
  export type LinkFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Link
     */
    select?: LinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Link
     */
    omit?: LinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkInclude<ExtArgs> | null
    /**
     * Filter, which Links to fetch.
     */
    where?: LinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Links to fetch.
     */
    orderBy?: LinkOrderByWithRelationInput | LinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Links.
     */
    cursor?: LinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Links from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Links.
     */
    skip?: number
    distinct?: LinkScalarFieldEnum | LinkScalarFieldEnum[]
  }

  /**
   * Link create
   */
  export type LinkCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Link
     */
    select?: LinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Link
     */
    omit?: LinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkInclude<ExtArgs> | null
    /**
     * The data needed to create a Link.
     */
    data: XOR<LinkCreateInput, LinkUncheckedCreateInput>
  }

  /**
   * Link createMany
   */
  export type LinkCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Links.
     */
    data: LinkCreateManyInput | LinkCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Link createManyAndReturn
   */
  export type LinkCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Link
     */
    select?: LinkSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Link
     */
    omit?: LinkOmit<ExtArgs> | null
    /**
     * The data used to create many Links.
     */
    data: LinkCreateManyInput | LinkCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Link update
   */
  export type LinkUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Link
     */
    select?: LinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Link
     */
    omit?: LinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkInclude<ExtArgs> | null
    /**
     * The data needed to update a Link.
     */
    data: XOR<LinkUpdateInput, LinkUncheckedUpdateInput>
    /**
     * Choose, which Link to update.
     */
    where: LinkWhereUniqueInput
  }

  /**
   * Link updateMany
   */
  export type LinkUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Links.
     */
    data: XOR<LinkUpdateManyMutationInput, LinkUncheckedUpdateManyInput>
    /**
     * Filter which Links to update
     */
    where?: LinkWhereInput
    /**
     * Limit how many Links to update.
     */
    limit?: number
  }

  /**
   * Link updateManyAndReturn
   */
  export type LinkUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Link
     */
    select?: LinkSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Link
     */
    omit?: LinkOmit<ExtArgs> | null
    /**
     * The data used to update Links.
     */
    data: XOR<LinkUpdateManyMutationInput, LinkUncheckedUpdateManyInput>
    /**
     * Filter which Links to update
     */
    where?: LinkWhereInput
    /**
     * Limit how many Links to update.
     */
    limit?: number
  }

  /**
   * Link upsert
   */
  export type LinkUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Link
     */
    select?: LinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Link
     */
    omit?: LinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkInclude<ExtArgs> | null
    /**
     * The filter to search for the Link to update in case it exists.
     */
    where: LinkWhereUniqueInput
    /**
     * In case the Link found by the `where` argument doesn't exist, create a new Link with this data.
     */
    create: XOR<LinkCreateInput, LinkUncheckedCreateInput>
    /**
     * In case the Link was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LinkUpdateInput, LinkUncheckedUpdateInput>
  }

  /**
   * Link delete
   */
  export type LinkDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Link
     */
    select?: LinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Link
     */
    omit?: LinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkInclude<ExtArgs> | null
    /**
     * Filter which Link to delete.
     */
    where: LinkWhereUniqueInput
  }

  /**
   * Link deleteMany
   */
  export type LinkDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Links to delete
     */
    where?: LinkWhereInput
    /**
     * Limit how many Links to delete.
     */
    limit?: number
  }

  /**
   * Link.LinkClassroom
   */
  export type Link$LinkClassroomArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LinkClassroom
     */
    select?: LinkClassroomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LinkClassroom
     */
    omit?: LinkClassroomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkClassroomInclude<ExtArgs> | null
    where?: LinkClassroomWhereInput
    orderBy?: LinkClassroomOrderByWithRelationInput | LinkClassroomOrderByWithRelationInput[]
    cursor?: LinkClassroomWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LinkClassroomScalarFieldEnum | LinkClassroomScalarFieldEnum[]
  }

  /**
   * Link without action
   */
  export type LinkDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Link
     */
    select?: LinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Link
     */
    omit?: LinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkInclude<ExtArgs> | null
  }


  /**
   * Model LinkClassroom
   */

  export type AggregateLinkClassroom = {
    _count: LinkClassroomCountAggregateOutputType | null
    _avg: LinkClassroomAvgAggregateOutputType | null
    _sum: LinkClassroomSumAggregateOutputType | null
    _min: LinkClassroomMinAggregateOutputType | null
    _max: LinkClassroomMaxAggregateOutputType | null
  }

  export type LinkClassroomAvgAggregateOutputType = {
    classroomId: number | null
    linkId: number | null
  }

  export type LinkClassroomSumAggregateOutputType = {
    classroomId: number | null
    linkId: number | null
  }

  export type LinkClassroomMinAggregateOutputType = {
    classroomId: number | null
    linkId: number | null
  }

  export type LinkClassroomMaxAggregateOutputType = {
    classroomId: number | null
    linkId: number | null
  }

  export type LinkClassroomCountAggregateOutputType = {
    classroomId: number
    linkId: number
    _all: number
  }


  export type LinkClassroomAvgAggregateInputType = {
    classroomId?: true
    linkId?: true
  }

  export type LinkClassroomSumAggregateInputType = {
    classroomId?: true
    linkId?: true
  }

  export type LinkClassroomMinAggregateInputType = {
    classroomId?: true
    linkId?: true
  }

  export type LinkClassroomMaxAggregateInputType = {
    classroomId?: true
    linkId?: true
  }

  export type LinkClassroomCountAggregateInputType = {
    classroomId?: true
    linkId?: true
    _all?: true
  }

  export type LinkClassroomAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LinkClassroom to aggregate.
     */
    where?: LinkClassroomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LinkClassrooms to fetch.
     */
    orderBy?: LinkClassroomOrderByWithRelationInput | LinkClassroomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LinkClassroomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LinkClassrooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LinkClassrooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LinkClassrooms
    **/
    _count?: true | LinkClassroomCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LinkClassroomAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LinkClassroomSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LinkClassroomMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LinkClassroomMaxAggregateInputType
  }

  export type GetLinkClassroomAggregateType<T extends LinkClassroomAggregateArgs> = {
        [P in keyof T & keyof AggregateLinkClassroom]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLinkClassroom[P]>
      : GetScalarType<T[P], AggregateLinkClassroom[P]>
  }




  export type LinkClassroomGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LinkClassroomWhereInput
    orderBy?: LinkClassroomOrderByWithAggregationInput | LinkClassroomOrderByWithAggregationInput[]
    by: LinkClassroomScalarFieldEnum[] | LinkClassroomScalarFieldEnum
    having?: LinkClassroomScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LinkClassroomCountAggregateInputType | true
    _avg?: LinkClassroomAvgAggregateInputType
    _sum?: LinkClassroomSumAggregateInputType
    _min?: LinkClassroomMinAggregateInputType
    _max?: LinkClassroomMaxAggregateInputType
  }

  export type LinkClassroomGroupByOutputType = {
    classroomId: number
    linkId: number
    _count: LinkClassroomCountAggregateOutputType | null
    _avg: LinkClassroomAvgAggregateOutputType | null
    _sum: LinkClassroomSumAggregateOutputType | null
    _min: LinkClassroomMinAggregateOutputType | null
    _max: LinkClassroomMaxAggregateOutputType | null
  }

  type GetLinkClassroomGroupByPayload<T extends LinkClassroomGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LinkClassroomGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LinkClassroomGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LinkClassroomGroupByOutputType[P]>
            : GetScalarType<T[P], LinkClassroomGroupByOutputType[P]>
        }
      >
    >


  export type LinkClassroomSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    classroomId?: boolean
    linkId?: boolean
    classroom?: boolean | ClassroomDefaultArgs<ExtArgs>
    link?: boolean | LinkDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["linkClassroom"]>

  export type LinkClassroomSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    classroomId?: boolean
    linkId?: boolean
    classroom?: boolean | ClassroomDefaultArgs<ExtArgs>
    link?: boolean | LinkDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["linkClassroom"]>

  export type LinkClassroomSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    classroomId?: boolean
    linkId?: boolean
    classroom?: boolean | ClassroomDefaultArgs<ExtArgs>
    link?: boolean | LinkDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["linkClassroom"]>

  export type LinkClassroomSelectScalar = {
    classroomId?: boolean
    linkId?: boolean
  }

  export type LinkClassroomOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"classroomId" | "linkId", ExtArgs["result"]["linkClassroom"]>
  export type LinkClassroomInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    classroom?: boolean | ClassroomDefaultArgs<ExtArgs>
    link?: boolean | LinkDefaultArgs<ExtArgs>
  }
  export type LinkClassroomIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    classroom?: boolean | ClassroomDefaultArgs<ExtArgs>
    link?: boolean | LinkDefaultArgs<ExtArgs>
  }
  export type LinkClassroomIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    classroom?: boolean | ClassroomDefaultArgs<ExtArgs>
    link?: boolean | LinkDefaultArgs<ExtArgs>
  }

  export type $LinkClassroomPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LinkClassroom"
    objects: {
      classroom: Prisma.$ClassroomPayload<ExtArgs>
      link: Prisma.$LinkPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      classroomId: number
      linkId: number
    }, ExtArgs["result"]["linkClassroom"]>
    composites: {}
  }

  type LinkClassroomGetPayload<S extends boolean | null | undefined | LinkClassroomDefaultArgs> = $Result.GetResult<Prisma.$LinkClassroomPayload, S>

  type LinkClassroomCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LinkClassroomFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LinkClassroomCountAggregateInputType | true
    }

  export interface LinkClassroomDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LinkClassroom'], meta: { name: 'LinkClassroom' } }
    /**
     * Find zero or one LinkClassroom that matches the filter.
     * @param {LinkClassroomFindUniqueArgs} args - Arguments to find a LinkClassroom
     * @example
     * // Get one LinkClassroom
     * const linkClassroom = await prisma.linkClassroom.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LinkClassroomFindUniqueArgs>(args: SelectSubset<T, LinkClassroomFindUniqueArgs<ExtArgs>>): Prisma__LinkClassroomClient<$Result.GetResult<Prisma.$LinkClassroomPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LinkClassroom that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LinkClassroomFindUniqueOrThrowArgs} args - Arguments to find a LinkClassroom
     * @example
     * // Get one LinkClassroom
     * const linkClassroom = await prisma.linkClassroom.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LinkClassroomFindUniqueOrThrowArgs>(args: SelectSubset<T, LinkClassroomFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LinkClassroomClient<$Result.GetResult<Prisma.$LinkClassroomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LinkClassroom that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LinkClassroomFindFirstArgs} args - Arguments to find a LinkClassroom
     * @example
     * // Get one LinkClassroom
     * const linkClassroom = await prisma.linkClassroom.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LinkClassroomFindFirstArgs>(args?: SelectSubset<T, LinkClassroomFindFirstArgs<ExtArgs>>): Prisma__LinkClassroomClient<$Result.GetResult<Prisma.$LinkClassroomPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LinkClassroom that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LinkClassroomFindFirstOrThrowArgs} args - Arguments to find a LinkClassroom
     * @example
     * // Get one LinkClassroom
     * const linkClassroom = await prisma.linkClassroom.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LinkClassroomFindFirstOrThrowArgs>(args?: SelectSubset<T, LinkClassroomFindFirstOrThrowArgs<ExtArgs>>): Prisma__LinkClassroomClient<$Result.GetResult<Prisma.$LinkClassroomPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LinkClassrooms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LinkClassroomFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LinkClassrooms
     * const linkClassrooms = await prisma.linkClassroom.findMany()
     * 
     * // Get first 10 LinkClassrooms
     * const linkClassrooms = await prisma.linkClassroom.findMany({ take: 10 })
     * 
     * // Only select the `classroomId`
     * const linkClassroomWithClassroomIdOnly = await prisma.linkClassroom.findMany({ select: { classroomId: true } })
     * 
     */
    findMany<T extends LinkClassroomFindManyArgs>(args?: SelectSubset<T, LinkClassroomFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LinkClassroomPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LinkClassroom.
     * @param {LinkClassroomCreateArgs} args - Arguments to create a LinkClassroom.
     * @example
     * // Create one LinkClassroom
     * const LinkClassroom = await prisma.linkClassroom.create({
     *   data: {
     *     // ... data to create a LinkClassroom
     *   }
     * })
     * 
     */
    create<T extends LinkClassroomCreateArgs>(args: SelectSubset<T, LinkClassroomCreateArgs<ExtArgs>>): Prisma__LinkClassroomClient<$Result.GetResult<Prisma.$LinkClassroomPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LinkClassrooms.
     * @param {LinkClassroomCreateManyArgs} args - Arguments to create many LinkClassrooms.
     * @example
     * // Create many LinkClassrooms
     * const linkClassroom = await prisma.linkClassroom.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LinkClassroomCreateManyArgs>(args?: SelectSubset<T, LinkClassroomCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LinkClassrooms and returns the data saved in the database.
     * @param {LinkClassroomCreateManyAndReturnArgs} args - Arguments to create many LinkClassrooms.
     * @example
     * // Create many LinkClassrooms
     * const linkClassroom = await prisma.linkClassroom.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LinkClassrooms and only return the `classroomId`
     * const linkClassroomWithClassroomIdOnly = await prisma.linkClassroom.createManyAndReturn({
     *   select: { classroomId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LinkClassroomCreateManyAndReturnArgs>(args?: SelectSubset<T, LinkClassroomCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LinkClassroomPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LinkClassroom.
     * @param {LinkClassroomDeleteArgs} args - Arguments to delete one LinkClassroom.
     * @example
     * // Delete one LinkClassroom
     * const LinkClassroom = await prisma.linkClassroom.delete({
     *   where: {
     *     // ... filter to delete one LinkClassroom
     *   }
     * })
     * 
     */
    delete<T extends LinkClassroomDeleteArgs>(args: SelectSubset<T, LinkClassroomDeleteArgs<ExtArgs>>): Prisma__LinkClassroomClient<$Result.GetResult<Prisma.$LinkClassroomPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LinkClassroom.
     * @param {LinkClassroomUpdateArgs} args - Arguments to update one LinkClassroom.
     * @example
     * // Update one LinkClassroom
     * const linkClassroom = await prisma.linkClassroom.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LinkClassroomUpdateArgs>(args: SelectSubset<T, LinkClassroomUpdateArgs<ExtArgs>>): Prisma__LinkClassroomClient<$Result.GetResult<Prisma.$LinkClassroomPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LinkClassrooms.
     * @param {LinkClassroomDeleteManyArgs} args - Arguments to filter LinkClassrooms to delete.
     * @example
     * // Delete a few LinkClassrooms
     * const { count } = await prisma.linkClassroom.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LinkClassroomDeleteManyArgs>(args?: SelectSubset<T, LinkClassroomDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LinkClassrooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LinkClassroomUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LinkClassrooms
     * const linkClassroom = await prisma.linkClassroom.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LinkClassroomUpdateManyArgs>(args: SelectSubset<T, LinkClassroomUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LinkClassrooms and returns the data updated in the database.
     * @param {LinkClassroomUpdateManyAndReturnArgs} args - Arguments to update many LinkClassrooms.
     * @example
     * // Update many LinkClassrooms
     * const linkClassroom = await prisma.linkClassroom.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LinkClassrooms and only return the `classroomId`
     * const linkClassroomWithClassroomIdOnly = await prisma.linkClassroom.updateManyAndReturn({
     *   select: { classroomId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LinkClassroomUpdateManyAndReturnArgs>(args: SelectSubset<T, LinkClassroomUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LinkClassroomPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LinkClassroom.
     * @param {LinkClassroomUpsertArgs} args - Arguments to update or create a LinkClassroom.
     * @example
     * // Update or create a LinkClassroom
     * const linkClassroom = await prisma.linkClassroom.upsert({
     *   create: {
     *     // ... data to create a LinkClassroom
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LinkClassroom we want to update
     *   }
     * })
     */
    upsert<T extends LinkClassroomUpsertArgs>(args: SelectSubset<T, LinkClassroomUpsertArgs<ExtArgs>>): Prisma__LinkClassroomClient<$Result.GetResult<Prisma.$LinkClassroomPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LinkClassrooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LinkClassroomCountArgs} args - Arguments to filter LinkClassrooms to count.
     * @example
     * // Count the number of LinkClassrooms
     * const count = await prisma.linkClassroom.count({
     *   where: {
     *     // ... the filter for the LinkClassrooms we want to count
     *   }
     * })
    **/
    count<T extends LinkClassroomCountArgs>(
      args?: Subset<T, LinkClassroomCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LinkClassroomCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LinkClassroom.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LinkClassroomAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LinkClassroomAggregateArgs>(args: Subset<T, LinkClassroomAggregateArgs>): Prisma.PrismaPromise<GetLinkClassroomAggregateType<T>>

    /**
     * Group by LinkClassroom.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LinkClassroomGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LinkClassroomGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LinkClassroomGroupByArgs['orderBy'] }
        : { orderBy?: LinkClassroomGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LinkClassroomGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLinkClassroomGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LinkClassroom model
   */
  readonly fields: LinkClassroomFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LinkClassroom.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LinkClassroomClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    classroom<T extends ClassroomDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClassroomDefaultArgs<ExtArgs>>): Prisma__ClassroomClient<$Result.GetResult<Prisma.$ClassroomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    link<T extends LinkDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LinkDefaultArgs<ExtArgs>>): Prisma__LinkClient<$Result.GetResult<Prisma.$LinkPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LinkClassroom model
   */
  interface LinkClassroomFieldRefs {
    readonly classroomId: FieldRef<"LinkClassroom", 'Int'>
    readonly linkId: FieldRef<"LinkClassroom", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * LinkClassroom findUnique
   */
  export type LinkClassroomFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LinkClassroom
     */
    select?: LinkClassroomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LinkClassroom
     */
    omit?: LinkClassroomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkClassroomInclude<ExtArgs> | null
    /**
     * Filter, which LinkClassroom to fetch.
     */
    where: LinkClassroomWhereUniqueInput
  }

  /**
   * LinkClassroom findUniqueOrThrow
   */
  export type LinkClassroomFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LinkClassroom
     */
    select?: LinkClassroomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LinkClassroom
     */
    omit?: LinkClassroomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkClassroomInclude<ExtArgs> | null
    /**
     * Filter, which LinkClassroom to fetch.
     */
    where: LinkClassroomWhereUniqueInput
  }

  /**
   * LinkClassroom findFirst
   */
  export type LinkClassroomFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LinkClassroom
     */
    select?: LinkClassroomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LinkClassroom
     */
    omit?: LinkClassroomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkClassroomInclude<ExtArgs> | null
    /**
     * Filter, which LinkClassroom to fetch.
     */
    where?: LinkClassroomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LinkClassrooms to fetch.
     */
    orderBy?: LinkClassroomOrderByWithRelationInput | LinkClassroomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LinkClassrooms.
     */
    cursor?: LinkClassroomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LinkClassrooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LinkClassrooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LinkClassrooms.
     */
    distinct?: LinkClassroomScalarFieldEnum | LinkClassroomScalarFieldEnum[]
  }

  /**
   * LinkClassroom findFirstOrThrow
   */
  export type LinkClassroomFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LinkClassroom
     */
    select?: LinkClassroomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LinkClassroom
     */
    omit?: LinkClassroomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkClassroomInclude<ExtArgs> | null
    /**
     * Filter, which LinkClassroom to fetch.
     */
    where?: LinkClassroomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LinkClassrooms to fetch.
     */
    orderBy?: LinkClassroomOrderByWithRelationInput | LinkClassroomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LinkClassrooms.
     */
    cursor?: LinkClassroomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LinkClassrooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LinkClassrooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LinkClassrooms.
     */
    distinct?: LinkClassroomScalarFieldEnum | LinkClassroomScalarFieldEnum[]
  }

  /**
   * LinkClassroom findMany
   */
  export type LinkClassroomFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LinkClassroom
     */
    select?: LinkClassroomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LinkClassroom
     */
    omit?: LinkClassroomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkClassroomInclude<ExtArgs> | null
    /**
     * Filter, which LinkClassrooms to fetch.
     */
    where?: LinkClassroomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LinkClassrooms to fetch.
     */
    orderBy?: LinkClassroomOrderByWithRelationInput | LinkClassroomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LinkClassrooms.
     */
    cursor?: LinkClassroomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LinkClassrooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LinkClassrooms.
     */
    skip?: number
    distinct?: LinkClassroomScalarFieldEnum | LinkClassroomScalarFieldEnum[]
  }

  /**
   * LinkClassroom create
   */
  export type LinkClassroomCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LinkClassroom
     */
    select?: LinkClassroomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LinkClassroom
     */
    omit?: LinkClassroomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkClassroomInclude<ExtArgs> | null
    /**
     * The data needed to create a LinkClassroom.
     */
    data: XOR<LinkClassroomCreateInput, LinkClassroomUncheckedCreateInput>
  }

  /**
   * LinkClassroom createMany
   */
  export type LinkClassroomCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LinkClassrooms.
     */
    data: LinkClassroomCreateManyInput | LinkClassroomCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LinkClassroom createManyAndReturn
   */
  export type LinkClassroomCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LinkClassroom
     */
    select?: LinkClassroomSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LinkClassroom
     */
    omit?: LinkClassroomOmit<ExtArgs> | null
    /**
     * The data used to create many LinkClassrooms.
     */
    data: LinkClassroomCreateManyInput | LinkClassroomCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkClassroomIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * LinkClassroom update
   */
  export type LinkClassroomUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LinkClassroom
     */
    select?: LinkClassroomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LinkClassroom
     */
    omit?: LinkClassroomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkClassroomInclude<ExtArgs> | null
    /**
     * The data needed to update a LinkClassroom.
     */
    data: XOR<LinkClassroomUpdateInput, LinkClassroomUncheckedUpdateInput>
    /**
     * Choose, which LinkClassroom to update.
     */
    where: LinkClassroomWhereUniqueInput
  }

  /**
   * LinkClassroom updateMany
   */
  export type LinkClassroomUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LinkClassrooms.
     */
    data: XOR<LinkClassroomUpdateManyMutationInput, LinkClassroomUncheckedUpdateManyInput>
    /**
     * Filter which LinkClassrooms to update
     */
    where?: LinkClassroomWhereInput
    /**
     * Limit how many LinkClassrooms to update.
     */
    limit?: number
  }

  /**
   * LinkClassroom updateManyAndReturn
   */
  export type LinkClassroomUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LinkClassroom
     */
    select?: LinkClassroomSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LinkClassroom
     */
    omit?: LinkClassroomOmit<ExtArgs> | null
    /**
     * The data used to update LinkClassrooms.
     */
    data: XOR<LinkClassroomUpdateManyMutationInput, LinkClassroomUncheckedUpdateManyInput>
    /**
     * Filter which LinkClassrooms to update
     */
    where?: LinkClassroomWhereInput
    /**
     * Limit how many LinkClassrooms to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkClassroomIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * LinkClassroom upsert
   */
  export type LinkClassroomUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LinkClassroom
     */
    select?: LinkClassroomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LinkClassroom
     */
    omit?: LinkClassroomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkClassroomInclude<ExtArgs> | null
    /**
     * The filter to search for the LinkClassroom to update in case it exists.
     */
    where: LinkClassroomWhereUniqueInput
    /**
     * In case the LinkClassroom found by the `where` argument doesn't exist, create a new LinkClassroom with this data.
     */
    create: XOR<LinkClassroomCreateInput, LinkClassroomUncheckedCreateInput>
    /**
     * In case the LinkClassroom was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LinkClassroomUpdateInput, LinkClassroomUncheckedUpdateInput>
  }

  /**
   * LinkClassroom delete
   */
  export type LinkClassroomDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LinkClassroom
     */
    select?: LinkClassroomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LinkClassroom
     */
    omit?: LinkClassroomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkClassroomInclude<ExtArgs> | null
    /**
     * Filter which LinkClassroom to delete.
     */
    where: LinkClassroomWhereUniqueInput
  }

  /**
   * LinkClassroom deleteMany
   */
  export type LinkClassroomDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LinkClassrooms to delete
     */
    where?: LinkClassroomWhereInput
    /**
     * Limit how many LinkClassrooms to delete.
     */
    limit?: number
  }

  /**
   * LinkClassroom without action
   */
  export type LinkClassroomDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LinkClassroom
     */
    select?: LinkClassroomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LinkClassroom
     */
    omit?: LinkClassroomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkClassroomInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const SchoolScalarFieldEnum: {
    schoolId: 'schoolId',
    schoolName: 'schoolName'
  };

  export type SchoolScalarFieldEnum = (typeof SchoolScalarFieldEnum)[keyof typeof SchoolScalarFieldEnum]


  export const ClassroomScalarFieldEnum: {
    classroomId: 'classroomId',
    classroomNumber: 'classroomNumber',
    classroomOrder: 'classroomOrder',
    classroomBorderColor: 'classroomBorderColor',
    classroomBackgroundColor: 'classroomBackgroundColor',
    classroomColor: 'classroomColor',
    schoolId: 'schoolId'
  };

  export type ClassroomScalarFieldEnum = (typeof ClassroomScalarFieldEnum)[keyof typeof ClassroomScalarFieldEnum]


  export const LinkScalarFieldEnum: {
    linkId: 'linkId',
    linkName: 'linkName',
    linkTitleFr: 'linkTitleFr',
    linkTitleBr: 'linkTitleBr',
    linkFullNameFr: 'linkFullNameFr',
    linkFullNameBr: 'linkFullNameBr',
    linkRedirection: 'linkRedirection',
    linkIcon: 'linkIcon',
    linkMatter: 'linkMatter',
    linkDescriptionFr: 'linkDescriptionFr',
    linkDescriptionBr: 'linkDescriptionBr',
    linkType: 'linkType'
  };

  export type LinkScalarFieldEnum = (typeof LinkScalarFieldEnum)[keyof typeof LinkScalarFieldEnum]


  export const LinkClassroomScalarFieldEnum: {
    classroomId: 'classroomId',
    linkId: 'linkId'
  };

  export type LinkClassroomScalarFieldEnum = (typeof LinkClassroomScalarFieldEnum)[keyof typeof LinkClassroomScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type SchoolWhereInput = {
    AND?: SchoolWhereInput | SchoolWhereInput[]
    OR?: SchoolWhereInput[]
    NOT?: SchoolWhereInput | SchoolWhereInput[]
    schoolId?: IntFilter<"School"> | number
    schoolName?: StringFilter<"School"> | string
    classrooms?: ClassroomListRelationFilter
  }

  export type SchoolOrderByWithRelationInput = {
    schoolId?: SortOrder
    schoolName?: SortOrder
    classrooms?: ClassroomOrderByRelationAggregateInput
  }

  export type SchoolWhereUniqueInput = Prisma.AtLeast<{
    schoolId?: number
    AND?: SchoolWhereInput | SchoolWhereInput[]
    OR?: SchoolWhereInput[]
    NOT?: SchoolWhereInput | SchoolWhereInput[]
    schoolName?: StringFilter<"School"> | string
    classrooms?: ClassroomListRelationFilter
  }, "schoolId">

  export type SchoolOrderByWithAggregationInput = {
    schoolId?: SortOrder
    schoolName?: SortOrder
    _count?: SchoolCountOrderByAggregateInput
    _avg?: SchoolAvgOrderByAggregateInput
    _max?: SchoolMaxOrderByAggregateInput
    _min?: SchoolMinOrderByAggregateInput
    _sum?: SchoolSumOrderByAggregateInput
  }

  export type SchoolScalarWhereWithAggregatesInput = {
    AND?: SchoolScalarWhereWithAggregatesInput | SchoolScalarWhereWithAggregatesInput[]
    OR?: SchoolScalarWhereWithAggregatesInput[]
    NOT?: SchoolScalarWhereWithAggregatesInput | SchoolScalarWhereWithAggregatesInput[]
    schoolId?: IntWithAggregatesFilter<"School"> | number
    schoolName?: StringWithAggregatesFilter<"School"> | string
  }

  export type ClassroomWhereInput = {
    AND?: ClassroomWhereInput | ClassroomWhereInput[]
    OR?: ClassroomWhereInput[]
    NOT?: ClassroomWhereInput | ClassroomWhereInput[]
    classroomId?: IntFilter<"Classroom"> | number
    classroomNumber?: IntFilter<"Classroom"> | number
    classroomOrder?: IntFilter<"Classroom"> | number
    classroomBorderColor?: StringFilter<"Classroom"> | string
    classroomBackgroundColor?: StringFilter<"Classroom"> | string
    classroomColor?: StringFilter<"Classroom"> | string
    schoolId?: IntNullableFilter<"Classroom"> | number | null
    school?: XOR<SchoolNullableScalarRelationFilter, SchoolWhereInput> | null
    LinkClassrooms?: LinkClassroomListRelationFilter
  }

  export type ClassroomOrderByWithRelationInput = {
    classroomId?: SortOrder
    classroomNumber?: SortOrder
    classroomOrder?: SortOrder
    classroomBorderColor?: SortOrder
    classroomBackgroundColor?: SortOrder
    classroomColor?: SortOrder
    schoolId?: SortOrderInput | SortOrder
    school?: SchoolOrderByWithRelationInput
    LinkClassrooms?: LinkClassroomOrderByRelationAggregateInput
  }

  export type ClassroomWhereUniqueInput = Prisma.AtLeast<{
    classroomId?: number
    AND?: ClassroomWhereInput | ClassroomWhereInput[]
    OR?: ClassroomWhereInput[]
    NOT?: ClassroomWhereInput | ClassroomWhereInput[]
    classroomNumber?: IntFilter<"Classroom"> | number
    classroomOrder?: IntFilter<"Classroom"> | number
    classroomBorderColor?: StringFilter<"Classroom"> | string
    classroomBackgroundColor?: StringFilter<"Classroom"> | string
    classroomColor?: StringFilter<"Classroom"> | string
    schoolId?: IntNullableFilter<"Classroom"> | number | null
    school?: XOR<SchoolNullableScalarRelationFilter, SchoolWhereInput> | null
    LinkClassrooms?: LinkClassroomListRelationFilter
  }, "classroomId">

  export type ClassroomOrderByWithAggregationInput = {
    classroomId?: SortOrder
    classroomNumber?: SortOrder
    classroomOrder?: SortOrder
    classroomBorderColor?: SortOrder
    classroomBackgroundColor?: SortOrder
    classroomColor?: SortOrder
    schoolId?: SortOrderInput | SortOrder
    _count?: ClassroomCountOrderByAggregateInput
    _avg?: ClassroomAvgOrderByAggregateInput
    _max?: ClassroomMaxOrderByAggregateInput
    _min?: ClassroomMinOrderByAggregateInput
    _sum?: ClassroomSumOrderByAggregateInput
  }

  export type ClassroomScalarWhereWithAggregatesInput = {
    AND?: ClassroomScalarWhereWithAggregatesInput | ClassroomScalarWhereWithAggregatesInput[]
    OR?: ClassroomScalarWhereWithAggregatesInput[]
    NOT?: ClassroomScalarWhereWithAggregatesInput | ClassroomScalarWhereWithAggregatesInput[]
    classroomId?: IntWithAggregatesFilter<"Classroom"> | number
    classroomNumber?: IntWithAggregatesFilter<"Classroom"> | number
    classroomOrder?: IntWithAggregatesFilter<"Classroom"> | number
    classroomBorderColor?: StringWithAggregatesFilter<"Classroom"> | string
    classroomBackgroundColor?: StringWithAggregatesFilter<"Classroom"> | string
    classroomColor?: StringWithAggregatesFilter<"Classroom"> | string
    schoolId?: IntNullableWithAggregatesFilter<"Classroom"> | number | null
  }

  export type LinkWhereInput = {
    AND?: LinkWhereInput | LinkWhereInput[]
    OR?: LinkWhereInput[]
    NOT?: LinkWhereInput | LinkWhereInput[]
    linkId?: IntFilter<"Link"> | number
    linkName?: StringFilter<"Link"> | string
    linkTitleFr?: StringNullableFilter<"Link"> | string | null
    linkTitleBr?: StringNullableFilter<"Link"> | string | null
    linkFullNameFr?: StringNullableFilter<"Link"> | string | null
    linkFullNameBr?: StringNullableFilter<"Link"> | string | null
    linkRedirection?: StringFilter<"Link"> | string
    linkIcon?: StringFilter<"Link"> | string
    linkMatter?: StringFilter<"Link"> | string
    linkDescriptionFr?: StringNullableFilter<"Link"> | string | null
    linkDescriptionBr?: StringNullableFilter<"Link"> | string | null
    linkType?: StringFilter<"Link"> | string
    LinkClassroom?: LinkClassroomListRelationFilter
  }

  export type LinkOrderByWithRelationInput = {
    linkId?: SortOrder
    linkName?: SortOrder
    linkTitleFr?: SortOrderInput | SortOrder
    linkTitleBr?: SortOrderInput | SortOrder
    linkFullNameFr?: SortOrderInput | SortOrder
    linkFullNameBr?: SortOrderInput | SortOrder
    linkRedirection?: SortOrder
    linkIcon?: SortOrder
    linkMatter?: SortOrder
    linkDescriptionFr?: SortOrderInput | SortOrder
    linkDescriptionBr?: SortOrderInput | SortOrder
    linkType?: SortOrder
    LinkClassroom?: LinkClassroomOrderByRelationAggregateInput
  }

  export type LinkWhereUniqueInput = Prisma.AtLeast<{
    linkId?: number
    AND?: LinkWhereInput | LinkWhereInput[]
    OR?: LinkWhereInput[]
    NOT?: LinkWhereInput | LinkWhereInput[]
    linkName?: StringFilter<"Link"> | string
    linkTitleFr?: StringNullableFilter<"Link"> | string | null
    linkTitleBr?: StringNullableFilter<"Link"> | string | null
    linkFullNameFr?: StringNullableFilter<"Link"> | string | null
    linkFullNameBr?: StringNullableFilter<"Link"> | string | null
    linkRedirection?: StringFilter<"Link"> | string
    linkIcon?: StringFilter<"Link"> | string
    linkMatter?: StringFilter<"Link"> | string
    linkDescriptionFr?: StringNullableFilter<"Link"> | string | null
    linkDescriptionBr?: StringNullableFilter<"Link"> | string | null
    linkType?: StringFilter<"Link"> | string
    LinkClassroom?: LinkClassroomListRelationFilter
  }, "linkId">

  export type LinkOrderByWithAggregationInput = {
    linkId?: SortOrder
    linkName?: SortOrder
    linkTitleFr?: SortOrderInput | SortOrder
    linkTitleBr?: SortOrderInput | SortOrder
    linkFullNameFr?: SortOrderInput | SortOrder
    linkFullNameBr?: SortOrderInput | SortOrder
    linkRedirection?: SortOrder
    linkIcon?: SortOrder
    linkMatter?: SortOrder
    linkDescriptionFr?: SortOrderInput | SortOrder
    linkDescriptionBr?: SortOrderInput | SortOrder
    linkType?: SortOrder
    _count?: LinkCountOrderByAggregateInput
    _avg?: LinkAvgOrderByAggregateInput
    _max?: LinkMaxOrderByAggregateInput
    _min?: LinkMinOrderByAggregateInput
    _sum?: LinkSumOrderByAggregateInput
  }

  export type LinkScalarWhereWithAggregatesInput = {
    AND?: LinkScalarWhereWithAggregatesInput | LinkScalarWhereWithAggregatesInput[]
    OR?: LinkScalarWhereWithAggregatesInput[]
    NOT?: LinkScalarWhereWithAggregatesInput | LinkScalarWhereWithAggregatesInput[]
    linkId?: IntWithAggregatesFilter<"Link"> | number
    linkName?: StringWithAggregatesFilter<"Link"> | string
    linkTitleFr?: StringNullableWithAggregatesFilter<"Link"> | string | null
    linkTitleBr?: StringNullableWithAggregatesFilter<"Link"> | string | null
    linkFullNameFr?: StringNullableWithAggregatesFilter<"Link"> | string | null
    linkFullNameBr?: StringNullableWithAggregatesFilter<"Link"> | string | null
    linkRedirection?: StringWithAggregatesFilter<"Link"> | string
    linkIcon?: StringWithAggregatesFilter<"Link"> | string
    linkMatter?: StringWithAggregatesFilter<"Link"> | string
    linkDescriptionFr?: StringNullableWithAggregatesFilter<"Link"> | string | null
    linkDescriptionBr?: StringNullableWithAggregatesFilter<"Link"> | string | null
    linkType?: StringWithAggregatesFilter<"Link"> | string
  }

  export type LinkClassroomWhereInput = {
    AND?: LinkClassroomWhereInput | LinkClassroomWhereInput[]
    OR?: LinkClassroomWhereInput[]
    NOT?: LinkClassroomWhereInput | LinkClassroomWhereInput[]
    classroomId?: IntFilter<"LinkClassroom"> | number
    linkId?: IntFilter<"LinkClassroom"> | number
    classroom?: XOR<ClassroomScalarRelationFilter, ClassroomWhereInput>
    link?: XOR<LinkScalarRelationFilter, LinkWhereInput>
  }

  export type LinkClassroomOrderByWithRelationInput = {
    classroomId?: SortOrder
    linkId?: SortOrder
    classroom?: ClassroomOrderByWithRelationInput
    link?: LinkOrderByWithRelationInput
  }

  export type LinkClassroomWhereUniqueInput = Prisma.AtLeast<{
    classroomId_linkId?: LinkClassroomClassroomIdLinkIdCompoundUniqueInput
    AND?: LinkClassroomWhereInput | LinkClassroomWhereInput[]
    OR?: LinkClassroomWhereInput[]
    NOT?: LinkClassroomWhereInput | LinkClassroomWhereInput[]
    classroomId?: IntFilter<"LinkClassroom"> | number
    linkId?: IntFilter<"LinkClassroom"> | number
    classroom?: XOR<ClassroomScalarRelationFilter, ClassroomWhereInput>
    link?: XOR<LinkScalarRelationFilter, LinkWhereInput>
  }, "classroomId_linkId">

  export type LinkClassroomOrderByWithAggregationInput = {
    classroomId?: SortOrder
    linkId?: SortOrder
    _count?: LinkClassroomCountOrderByAggregateInput
    _avg?: LinkClassroomAvgOrderByAggregateInput
    _max?: LinkClassroomMaxOrderByAggregateInput
    _min?: LinkClassroomMinOrderByAggregateInput
    _sum?: LinkClassroomSumOrderByAggregateInput
  }

  export type LinkClassroomScalarWhereWithAggregatesInput = {
    AND?: LinkClassroomScalarWhereWithAggregatesInput | LinkClassroomScalarWhereWithAggregatesInput[]
    OR?: LinkClassroomScalarWhereWithAggregatesInput[]
    NOT?: LinkClassroomScalarWhereWithAggregatesInput | LinkClassroomScalarWhereWithAggregatesInput[]
    classroomId?: IntWithAggregatesFilter<"LinkClassroom"> | number
    linkId?: IntWithAggregatesFilter<"LinkClassroom"> | number
  }

  export type SchoolCreateInput = {
    schoolName: string
    classrooms?: ClassroomCreateNestedManyWithoutSchoolInput
  }

  export type SchoolUncheckedCreateInput = {
    schoolId?: number
    schoolName: string
    classrooms?: ClassroomUncheckedCreateNestedManyWithoutSchoolInput
  }

  export type SchoolUpdateInput = {
    schoolName?: StringFieldUpdateOperationsInput | string
    classrooms?: ClassroomUpdateManyWithoutSchoolNestedInput
  }

  export type SchoolUncheckedUpdateInput = {
    schoolId?: IntFieldUpdateOperationsInput | number
    schoolName?: StringFieldUpdateOperationsInput | string
    classrooms?: ClassroomUncheckedUpdateManyWithoutSchoolNestedInput
  }

  export type SchoolCreateManyInput = {
    schoolId?: number
    schoolName: string
  }

  export type SchoolUpdateManyMutationInput = {
    schoolName?: StringFieldUpdateOperationsInput | string
  }

  export type SchoolUncheckedUpdateManyInput = {
    schoolId?: IntFieldUpdateOperationsInput | number
    schoolName?: StringFieldUpdateOperationsInput | string
  }

  export type ClassroomCreateInput = {
    classroomNumber: number
    classroomOrder?: number
    classroomBorderColor: string
    classroomBackgroundColor: string
    classroomColor: string
    school?: SchoolCreateNestedOneWithoutClassroomsInput
    LinkClassrooms?: LinkClassroomCreateNestedManyWithoutClassroomInput
  }

  export type ClassroomUncheckedCreateInput = {
    classroomId?: number
    classroomNumber: number
    classroomOrder?: number
    classroomBorderColor: string
    classroomBackgroundColor: string
    classroomColor: string
    schoolId?: number | null
    LinkClassrooms?: LinkClassroomUncheckedCreateNestedManyWithoutClassroomInput
  }

  export type ClassroomUpdateInput = {
    classroomNumber?: IntFieldUpdateOperationsInput | number
    classroomOrder?: IntFieldUpdateOperationsInput | number
    classroomBorderColor?: StringFieldUpdateOperationsInput | string
    classroomBackgroundColor?: StringFieldUpdateOperationsInput | string
    classroomColor?: StringFieldUpdateOperationsInput | string
    school?: SchoolUpdateOneWithoutClassroomsNestedInput
    LinkClassrooms?: LinkClassroomUpdateManyWithoutClassroomNestedInput
  }

  export type ClassroomUncheckedUpdateInput = {
    classroomId?: IntFieldUpdateOperationsInput | number
    classroomNumber?: IntFieldUpdateOperationsInput | number
    classroomOrder?: IntFieldUpdateOperationsInput | number
    classroomBorderColor?: StringFieldUpdateOperationsInput | string
    classroomBackgroundColor?: StringFieldUpdateOperationsInput | string
    classroomColor?: StringFieldUpdateOperationsInput | string
    schoolId?: NullableIntFieldUpdateOperationsInput | number | null
    LinkClassrooms?: LinkClassroomUncheckedUpdateManyWithoutClassroomNestedInput
  }

  export type ClassroomCreateManyInput = {
    classroomId?: number
    classroomNumber: number
    classroomOrder?: number
    classroomBorderColor: string
    classroomBackgroundColor: string
    classroomColor: string
    schoolId?: number | null
  }

  export type ClassroomUpdateManyMutationInput = {
    classroomNumber?: IntFieldUpdateOperationsInput | number
    classroomOrder?: IntFieldUpdateOperationsInput | number
    classroomBorderColor?: StringFieldUpdateOperationsInput | string
    classroomBackgroundColor?: StringFieldUpdateOperationsInput | string
    classroomColor?: StringFieldUpdateOperationsInput | string
  }

  export type ClassroomUncheckedUpdateManyInput = {
    classroomId?: IntFieldUpdateOperationsInput | number
    classroomNumber?: IntFieldUpdateOperationsInput | number
    classroomOrder?: IntFieldUpdateOperationsInput | number
    classroomBorderColor?: StringFieldUpdateOperationsInput | string
    classroomBackgroundColor?: StringFieldUpdateOperationsInput | string
    classroomColor?: StringFieldUpdateOperationsInput | string
    schoolId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type LinkCreateInput = {
    linkName: string
    linkTitleFr?: string | null
    linkTitleBr?: string | null
    linkFullNameFr?: string | null
    linkFullNameBr?: string | null
    linkRedirection: string
    linkIcon: string
    linkMatter: string
    linkDescriptionFr?: string | null
    linkDescriptionBr?: string | null
    linkType?: string
    LinkClassroom?: LinkClassroomCreateNestedManyWithoutLinkInput
  }

  export type LinkUncheckedCreateInput = {
    linkId?: number
    linkName: string
    linkTitleFr?: string | null
    linkTitleBr?: string | null
    linkFullNameFr?: string | null
    linkFullNameBr?: string | null
    linkRedirection: string
    linkIcon: string
    linkMatter: string
    linkDescriptionFr?: string | null
    linkDescriptionBr?: string | null
    linkType?: string
    LinkClassroom?: LinkClassroomUncheckedCreateNestedManyWithoutLinkInput
  }

  export type LinkUpdateInput = {
    linkName?: StringFieldUpdateOperationsInput | string
    linkTitleFr?: NullableStringFieldUpdateOperationsInput | string | null
    linkTitleBr?: NullableStringFieldUpdateOperationsInput | string | null
    linkFullNameFr?: NullableStringFieldUpdateOperationsInput | string | null
    linkFullNameBr?: NullableStringFieldUpdateOperationsInput | string | null
    linkRedirection?: StringFieldUpdateOperationsInput | string
    linkIcon?: StringFieldUpdateOperationsInput | string
    linkMatter?: StringFieldUpdateOperationsInput | string
    linkDescriptionFr?: NullableStringFieldUpdateOperationsInput | string | null
    linkDescriptionBr?: NullableStringFieldUpdateOperationsInput | string | null
    linkType?: StringFieldUpdateOperationsInput | string
    LinkClassroom?: LinkClassroomUpdateManyWithoutLinkNestedInput
  }

  export type LinkUncheckedUpdateInput = {
    linkId?: IntFieldUpdateOperationsInput | number
    linkName?: StringFieldUpdateOperationsInput | string
    linkTitleFr?: NullableStringFieldUpdateOperationsInput | string | null
    linkTitleBr?: NullableStringFieldUpdateOperationsInput | string | null
    linkFullNameFr?: NullableStringFieldUpdateOperationsInput | string | null
    linkFullNameBr?: NullableStringFieldUpdateOperationsInput | string | null
    linkRedirection?: StringFieldUpdateOperationsInput | string
    linkIcon?: StringFieldUpdateOperationsInput | string
    linkMatter?: StringFieldUpdateOperationsInput | string
    linkDescriptionFr?: NullableStringFieldUpdateOperationsInput | string | null
    linkDescriptionBr?: NullableStringFieldUpdateOperationsInput | string | null
    linkType?: StringFieldUpdateOperationsInput | string
    LinkClassroom?: LinkClassroomUncheckedUpdateManyWithoutLinkNestedInput
  }

  export type LinkCreateManyInput = {
    linkId?: number
    linkName: string
    linkTitleFr?: string | null
    linkTitleBr?: string | null
    linkFullNameFr?: string | null
    linkFullNameBr?: string | null
    linkRedirection: string
    linkIcon: string
    linkMatter: string
    linkDescriptionFr?: string | null
    linkDescriptionBr?: string | null
    linkType?: string
  }

  export type LinkUpdateManyMutationInput = {
    linkName?: StringFieldUpdateOperationsInput | string
    linkTitleFr?: NullableStringFieldUpdateOperationsInput | string | null
    linkTitleBr?: NullableStringFieldUpdateOperationsInput | string | null
    linkFullNameFr?: NullableStringFieldUpdateOperationsInput | string | null
    linkFullNameBr?: NullableStringFieldUpdateOperationsInput | string | null
    linkRedirection?: StringFieldUpdateOperationsInput | string
    linkIcon?: StringFieldUpdateOperationsInput | string
    linkMatter?: StringFieldUpdateOperationsInput | string
    linkDescriptionFr?: NullableStringFieldUpdateOperationsInput | string | null
    linkDescriptionBr?: NullableStringFieldUpdateOperationsInput | string | null
    linkType?: StringFieldUpdateOperationsInput | string
  }

  export type LinkUncheckedUpdateManyInput = {
    linkId?: IntFieldUpdateOperationsInput | number
    linkName?: StringFieldUpdateOperationsInput | string
    linkTitleFr?: NullableStringFieldUpdateOperationsInput | string | null
    linkTitleBr?: NullableStringFieldUpdateOperationsInput | string | null
    linkFullNameFr?: NullableStringFieldUpdateOperationsInput | string | null
    linkFullNameBr?: NullableStringFieldUpdateOperationsInput | string | null
    linkRedirection?: StringFieldUpdateOperationsInput | string
    linkIcon?: StringFieldUpdateOperationsInput | string
    linkMatter?: StringFieldUpdateOperationsInput | string
    linkDescriptionFr?: NullableStringFieldUpdateOperationsInput | string | null
    linkDescriptionBr?: NullableStringFieldUpdateOperationsInput | string | null
    linkType?: StringFieldUpdateOperationsInput | string
  }

  export type LinkClassroomCreateInput = {
    classroom: ClassroomCreateNestedOneWithoutLinkClassroomsInput
    link: LinkCreateNestedOneWithoutLinkClassroomInput
  }

  export type LinkClassroomUncheckedCreateInput = {
    classroomId: number
    linkId: number
  }

  export type LinkClassroomUpdateInput = {
    classroom?: ClassroomUpdateOneRequiredWithoutLinkClassroomsNestedInput
    link?: LinkUpdateOneRequiredWithoutLinkClassroomNestedInput
  }

  export type LinkClassroomUncheckedUpdateInput = {
    classroomId?: IntFieldUpdateOperationsInput | number
    linkId?: IntFieldUpdateOperationsInput | number
  }

  export type LinkClassroomCreateManyInput = {
    classroomId: number
    linkId: number
  }

  export type LinkClassroomUpdateManyMutationInput = {

  }

  export type LinkClassroomUncheckedUpdateManyInput = {
    classroomId?: IntFieldUpdateOperationsInput | number
    linkId?: IntFieldUpdateOperationsInput | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type ClassroomListRelationFilter = {
    every?: ClassroomWhereInput
    some?: ClassroomWhereInput
    none?: ClassroomWhereInput
  }

  export type ClassroomOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SchoolCountOrderByAggregateInput = {
    schoolId?: SortOrder
    schoolName?: SortOrder
  }

  export type SchoolAvgOrderByAggregateInput = {
    schoolId?: SortOrder
  }

  export type SchoolMaxOrderByAggregateInput = {
    schoolId?: SortOrder
    schoolName?: SortOrder
  }

  export type SchoolMinOrderByAggregateInput = {
    schoolId?: SortOrder
    schoolName?: SortOrder
  }

  export type SchoolSumOrderByAggregateInput = {
    schoolId?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type SchoolNullableScalarRelationFilter = {
    is?: SchoolWhereInput | null
    isNot?: SchoolWhereInput | null
  }

  export type LinkClassroomListRelationFilter = {
    every?: LinkClassroomWhereInput
    some?: LinkClassroomWhereInput
    none?: LinkClassroomWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type LinkClassroomOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ClassroomCountOrderByAggregateInput = {
    classroomId?: SortOrder
    classroomNumber?: SortOrder
    classroomOrder?: SortOrder
    classroomBorderColor?: SortOrder
    classroomBackgroundColor?: SortOrder
    classroomColor?: SortOrder
    schoolId?: SortOrder
  }

  export type ClassroomAvgOrderByAggregateInput = {
    classroomId?: SortOrder
    classroomNumber?: SortOrder
    classroomOrder?: SortOrder
    schoolId?: SortOrder
  }

  export type ClassroomMaxOrderByAggregateInput = {
    classroomId?: SortOrder
    classroomNumber?: SortOrder
    classroomOrder?: SortOrder
    classroomBorderColor?: SortOrder
    classroomBackgroundColor?: SortOrder
    classroomColor?: SortOrder
    schoolId?: SortOrder
  }

  export type ClassroomMinOrderByAggregateInput = {
    classroomId?: SortOrder
    classroomNumber?: SortOrder
    classroomOrder?: SortOrder
    classroomBorderColor?: SortOrder
    classroomBackgroundColor?: SortOrder
    classroomColor?: SortOrder
    schoolId?: SortOrder
  }

  export type ClassroomSumOrderByAggregateInput = {
    classroomId?: SortOrder
    classroomNumber?: SortOrder
    classroomOrder?: SortOrder
    schoolId?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type LinkCountOrderByAggregateInput = {
    linkId?: SortOrder
    linkName?: SortOrder
    linkTitleFr?: SortOrder
    linkTitleBr?: SortOrder
    linkFullNameFr?: SortOrder
    linkFullNameBr?: SortOrder
    linkRedirection?: SortOrder
    linkIcon?: SortOrder
    linkMatter?: SortOrder
    linkDescriptionFr?: SortOrder
    linkDescriptionBr?: SortOrder
    linkType?: SortOrder
  }

  export type LinkAvgOrderByAggregateInput = {
    linkId?: SortOrder
  }

  export type LinkMaxOrderByAggregateInput = {
    linkId?: SortOrder
    linkName?: SortOrder
    linkTitleFr?: SortOrder
    linkTitleBr?: SortOrder
    linkFullNameFr?: SortOrder
    linkFullNameBr?: SortOrder
    linkRedirection?: SortOrder
    linkIcon?: SortOrder
    linkMatter?: SortOrder
    linkDescriptionFr?: SortOrder
    linkDescriptionBr?: SortOrder
    linkType?: SortOrder
  }

  export type LinkMinOrderByAggregateInput = {
    linkId?: SortOrder
    linkName?: SortOrder
    linkTitleFr?: SortOrder
    linkTitleBr?: SortOrder
    linkFullNameFr?: SortOrder
    linkFullNameBr?: SortOrder
    linkRedirection?: SortOrder
    linkIcon?: SortOrder
    linkMatter?: SortOrder
    linkDescriptionFr?: SortOrder
    linkDescriptionBr?: SortOrder
    linkType?: SortOrder
  }

  export type LinkSumOrderByAggregateInput = {
    linkId?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type ClassroomScalarRelationFilter = {
    is?: ClassroomWhereInput
    isNot?: ClassroomWhereInput
  }

  export type LinkScalarRelationFilter = {
    is?: LinkWhereInput
    isNot?: LinkWhereInput
  }

  export type LinkClassroomClassroomIdLinkIdCompoundUniqueInput = {
    classroomId: number
    linkId: number
  }

  export type LinkClassroomCountOrderByAggregateInput = {
    classroomId?: SortOrder
    linkId?: SortOrder
  }

  export type LinkClassroomAvgOrderByAggregateInput = {
    classroomId?: SortOrder
    linkId?: SortOrder
  }

  export type LinkClassroomMaxOrderByAggregateInput = {
    classroomId?: SortOrder
    linkId?: SortOrder
  }

  export type LinkClassroomMinOrderByAggregateInput = {
    classroomId?: SortOrder
    linkId?: SortOrder
  }

  export type LinkClassroomSumOrderByAggregateInput = {
    classroomId?: SortOrder
    linkId?: SortOrder
  }

  export type ClassroomCreateNestedManyWithoutSchoolInput = {
    create?: XOR<ClassroomCreateWithoutSchoolInput, ClassroomUncheckedCreateWithoutSchoolInput> | ClassroomCreateWithoutSchoolInput[] | ClassroomUncheckedCreateWithoutSchoolInput[]
    connectOrCreate?: ClassroomCreateOrConnectWithoutSchoolInput | ClassroomCreateOrConnectWithoutSchoolInput[]
    createMany?: ClassroomCreateManySchoolInputEnvelope
    connect?: ClassroomWhereUniqueInput | ClassroomWhereUniqueInput[]
  }

  export type ClassroomUncheckedCreateNestedManyWithoutSchoolInput = {
    create?: XOR<ClassroomCreateWithoutSchoolInput, ClassroomUncheckedCreateWithoutSchoolInput> | ClassroomCreateWithoutSchoolInput[] | ClassroomUncheckedCreateWithoutSchoolInput[]
    connectOrCreate?: ClassroomCreateOrConnectWithoutSchoolInput | ClassroomCreateOrConnectWithoutSchoolInput[]
    createMany?: ClassroomCreateManySchoolInputEnvelope
    connect?: ClassroomWhereUniqueInput | ClassroomWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type ClassroomUpdateManyWithoutSchoolNestedInput = {
    create?: XOR<ClassroomCreateWithoutSchoolInput, ClassroomUncheckedCreateWithoutSchoolInput> | ClassroomCreateWithoutSchoolInput[] | ClassroomUncheckedCreateWithoutSchoolInput[]
    connectOrCreate?: ClassroomCreateOrConnectWithoutSchoolInput | ClassroomCreateOrConnectWithoutSchoolInput[]
    upsert?: ClassroomUpsertWithWhereUniqueWithoutSchoolInput | ClassroomUpsertWithWhereUniqueWithoutSchoolInput[]
    createMany?: ClassroomCreateManySchoolInputEnvelope
    set?: ClassroomWhereUniqueInput | ClassroomWhereUniqueInput[]
    disconnect?: ClassroomWhereUniqueInput | ClassroomWhereUniqueInput[]
    delete?: ClassroomWhereUniqueInput | ClassroomWhereUniqueInput[]
    connect?: ClassroomWhereUniqueInput | ClassroomWhereUniqueInput[]
    update?: ClassroomUpdateWithWhereUniqueWithoutSchoolInput | ClassroomUpdateWithWhereUniqueWithoutSchoolInput[]
    updateMany?: ClassroomUpdateManyWithWhereWithoutSchoolInput | ClassroomUpdateManyWithWhereWithoutSchoolInput[]
    deleteMany?: ClassroomScalarWhereInput | ClassroomScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ClassroomUncheckedUpdateManyWithoutSchoolNestedInput = {
    create?: XOR<ClassroomCreateWithoutSchoolInput, ClassroomUncheckedCreateWithoutSchoolInput> | ClassroomCreateWithoutSchoolInput[] | ClassroomUncheckedCreateWithoutSchoolInput[]
    connectOrCreate?: ClassroomCreateOrConnectWithoutSchoolInput | ClassroomCreateOrConnectWithoutSchoolInput[]
    upsert?: ClassroomUpsertWithWhereUniqueWithoutSchoolInput | ClassroomUpsertWithWhereUniqueWithoutSchoolInput[]
    createMany?: ClassroomCreateManySchoolInputEnvelope
    set?: ClassroomWhereUniqueInput | ClassroomWhereUniqueInput[]
    disconnect?: ClassroomWhereUniqueInput | ClassroomWhereUniqueInput[]
    delete?: ClassroomWhereUniqueInput | ClassroomWhereUniqueInput[]
    connect?: ClassroomWhereUniqueInput | ClassroomWhereUniqueInput[]
    update?: ClassroomUpdateWithWhereUniqueWithoutSchoolInput | ClassroomUpdateWithWhereUniqueWithoutSchoolInput[]
    updateMany?: ClassroomUpdateManyWithWhereWithoutSchoolInput | ClassroomUpdateManyWithWhereWithoutSchoolInput[]
    deleteMany?: ClassroomScalarWhereInput | ClassroomScalarWhereInput[]
  }

  export type SchoolCreateNestedOneWithoutClassroomsInput = {
    create?: XOR<SchoolCreateWithoutClassroomsInput, SchoolUncheckedCreateWithoutClassroomsInput>
    connectOrCreate?: SchoolCreateOrConnectWithoutClassroomsInput
    connect?: SchoolWhereUniqueInput
  }

  export type LinkClassroomCreateNestedManyWithoutClassroomInput = {
    create?: XOR<LinkClassroomCreateWithoutClassroomInput, LinkClassroomUncheckedCreateWithoutClassroomInput> | LinkClassroomCreateWithoutClassroomInput[] | LinkClassroomUncheckedCreateWithoutClassroomInput[]
    connectOrCreate?: LinkClassroomCreateOrConnectWithoutClassroomInput | LinkClassroomCreateOrConnectWithoutClassroomInput[]
    createMany?: LinkClassroomCreateManyClassroomInputEnvelope
    connect?: LinkClassroomWhereUniqueInput | LinkClassroomWhereUniqueInput[]
  }

  export type LinkClassroomUncheckedCreateNestedManyWithoutClassroomInput = {
    create?: XOR<LinkClassroomCreateWithoutClassroomInput, LinkClassroomUncheckedCreateWithoutClassroomInput> | LinkClassroomCreateWithoutClassroomInput[] | LinkClassroomUncheckedCreateWithoutClassroomInput[]
    connectOrCreate?: LinkClassroomCreateOrConnectWithoutClassroomInput | LinkClassroomCreateOrConnectWithoutClassroomInput[]
    createMany?: LinkClassroomCreateManyClassroomInputEnvelope
    connect?: LinkClassroomWhereUniqueInput | LinkClassroomWhereUniqueInput[]
  }

  export type SchoolUpdateOneWithoutClassroomsNestedInput = {
    create?: XOR<SchoolCreateWithoutClassroomsInput, SchoolUncheckedCreateWithoutClassroomsInput>
    connectOrCreate?: SchoolCreateOrConnectWithoutClassroomsInput
    upsert?: SchoolUpsertWithoutClassroomsInput
    disconnect?: SchoolWhereInput | boolean
    delete?: SchoolWhereInput | boolean
    connect?: SchoolWhereUniqueInput
    update?: XOR<XOR<SchoolUpdateToOneWithWhereWithoutClassroomsInput, SchoolUpdateWithoutClassroomsInput>, SchoolUncheckedUpdateWithoutClassroomsInput>
  }

  export type LinkClassroomUpdateManyWithoutClassroomNestedInput = {
    create?: XOR<LinkClassroomCreateWithoutClassroomInput, LinkClassroomUncheckedCreateWithoutClassroomInput> | LinkClassroomCreateWithoutClassroomInput[] | LinkClassroomUncheckedCreateWithoutClassroomInput[]
    connectOrCreate?: LinkClassroomCreateOrConnectWithoutClassroomInput | LinkClassroomCreateOrConnectWithoutClassroomInput[]
    upsert?: LinkClassroomUpsertWithWhereUniqueWithoutClassroomInput | LinkClassroomUpsertWithWhereUniqueWithoutClassroomInput[]
    createMany?: LinkClassroomCreateManyClassroomInputEnvelope
    set?: LinkClassroomWhereUniqueInput | LinkClassroomWhereUniqueInput[]
    disconnect?: LinkClassroomWhereUniqueInput | LinkClassroomWhereUniqueInput[]
    delete?: LinkClassroomWhereUniqueInput | LinkClassroomWhereUniqueInput[]
    connect?: LinkClassroomWhereUniqueInput | LinkClassroomWhereUniqueInput[]
    update?: LinkClassroomUpdateWithWhereUniqueWithoutClassroomInput | LinkClassroomUpdateWithWhereUniqueWithoutClassroomInput[]
    updateMany?: LinkClassroomUpdateManyWithWhereWithoutClassroomInput | LinkClassroomUpdateManyWithWhereWithoutClassroomInput[]
    deleteMany?: LinkClassroomScalarWhereInput | LinkClassroomScalarWhereInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type LinkClassroomUncheckedUpdateManyWithoutClassroomNestedInput = {
    create?: XOR<LinkClassroomCreateWithoutClassroomInput, LinkClassroomUncheckedCreateWithoutClassroomInput> | LinkClassroomCreateWithoutClassroomInput[] | LinkClassroomUncheckedCreateWithoutClassroomInput[]
    connectOrCreate?: LinkClassroomCreateOrConnectWithoutClassroomInput | LinkClassroomCreateOrConnectWithoutClassroomInput[]
    upsert?: LinkClassroomUpsertWithWhereUniqueWithoutClassroomInput | LinkClassroomUpsertWithWhereUniqueWithoutClassroomInput[]
    createMany?: LinkClassroomCreateManyClassroomInputEnvelope
    set?: LinkClassroomWhereUniqueInput | LinkClassroomWhereUniqueInput[]
    disconnect?: LinkClassroomWhereUniqueInput | LinkClassroomWhereUniqueInput[]
    delete?: LinkClassroomWhereUniqueInput | LinkClassroomWhereUniqueInput[]
    connect?: LinkClassroomWhereUniqueInput | LinkClassroomWhereUniqueInput[]
    update?: LinkClassroomUpdateWithWhereUniqueWithoutClassroomInput | LinkClassroomUpdateWithWhereUniqueWithoutClassroomInput[]
    updateMany?: LinkClassroomUpdateManyWithWhereWithoutClassroomInput | LinkClassroomUpdateManyWithWhereWithoutClassroomInput[]
    deleteMany?: LinkClassroomScalarWhereInput | LinkClassroomScalarWhereInput[]
  }

  export type LinkClassroomCreateNestedManyWithoutLinkInput = {
    create?: XOR<LinkClassroomCreateWithoutLinkInput, LinkClassroomUncheckedCreateWithoutLinkInput> | LinkClassroomCreateWithoutLinkInput[] | LinkClassroomUncheckedCreateWithoutLinkInput[]
    connectOrCreate?: LinkClassroomCreateOrConnectWithoutLinkInput | LinkClassroomCreateOrConnectWithoutLinkInput[]
    createMany?: LinkClassroomCreateManyLinkInputEnvelope
    connect?: LinkClassroomWhereUniqueInput | LinkClassroomWhereUniqueInput[]
  }

  export type LinkClassroomUncheckedCreateNestedManyWithoutLinkInput = {
    create?: XOR<LinkClassroomCreateWithoutLinkInput, LinkClassroomUncheckedCreateWithoutLinkInput> | LinkClassroomCreateWithoutLinkInput[] | LinkClassroomUncheckedCreateWithoutLinkInput[]
    connectOrCreate?: LinkClassroomCreateOrConnectWithoutLinkInput | LinkClassroomCreateOrConnectWithoutLinkInput[]
    createMany?: LinkClassroomCreateManyLinkInputEnvelope
    connect?: LinkClassroomWhereUniqueInput | LinkClassroomWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type LinkClassroomUpdateManyWithoutLinkNestedInput = {
    create?: XOR<LinkClassroomCreateWithoutLinkInput, LinkClassroomUncheckedCreateWithoutLinkInput> | LinkClassroomCreateWithoutLinkInput[] | LinkClassroomUncheckedCreateWithoutLinkInput[]
    connectOrCreate?: LinkClassroomCreateOrConnectWithoutLinkInput | LinkClassroomCreateOrConnectWithoutLinkInput[]
    upsert?: LinkClassroomUpsertWithWhereUniqueWithoutLinkInput | LinkClassroomUpsertWithWhereUniqueWithoutLinkInput[]
    createMany?: LinkClassroomCreateManyLinkInputEnvelope
    set?: LinkClassroomWhereUniqueInput | LinkClassroomWhereUniqueInput[]
    disconnect?: LinkClassroomWhereUniqueInput | LinkClassroomWhereUniqueInput[]
    delete?: LinkClassroomWhereUniqueInput | LinkClassroomWhereUniqueInput[]
    connect?: LinkClassroomWhereUniqueInput | LinkClassroomWhereUniqueInput[]
    update?: LinkClassroomUpdateWithWhereUniqueWithoutLinkInput | LinkClassroomUpdateWithWhereUniqueWithoutLinkInput[]
    updateMany?: LinkClassroomUpdateManyWithWhereWithoutLinkInput | LinkClassroomUpdateManyWithWhereWithoutLinkInput[]
    deleteMany?: LinkClassroomScalarWhereInput | LinkClassroomScalarWhereInput[]
  }

  export type LinkClassroomUncheckedUpdateManyWithoutLinkNestedInput = {
    create?: XOR<LinkClassroomCreateWithoutLinkInput, LinkClassroomUncheckedCreateWithoutLinkInput> | LinkClassroomCreateWithoutLinkInput[] | LinkClassroomUncheckedCreateWithoutLinkInput[]
    connectOrCreate?: LinkClassroomCreateOrConnectWithoutLinkInput | LinkClassroomCreateOrConnectWithoutLinkInput[]
    upsert?: LinkClassroomUpsertWithWhereUniqueWithoutLinkInput | LinkClassroomUpsertWithWhereUniqueWithoutLinkInput[]
    createMany?: LinkClassroomCreateManyLinkInputEnvelope
    set?: LinkClassroomWhereUniqueInput | LinkClassroomWhereUniqueInput[]
    disconnect?: LinkClassroomWhereUniqueInput | LinkClassroomWhereUniqueInput[]
    delete?: LinkClassroomWhereUniqueInput | LinkClassroomWhereUniqueInput[]
    connect?: LinkClassroomWhereUniqueInput | LinkClassroomWhereUniqueInput[]
    update?: LinkClassroomUpdateWithWhereUniqueWithoutLinkInput | LinkClassroomUpdateWithWhereUniqueWithoutLinkInput[]
    updateMany?: LinkClassroomUpdateManyWithWhereWithoutLinkInput | LinkClassroomUpdateManyWithWhereWithoutLinkInput[]
    deleteMany?: LinkClassroomScalarWhereInput | LinkClassroomScalarWhereInput[]
  }

  export type ClassroomCreateNestedOneWithoutLinkClassroomsInput = {
    create?: XOR<ClassroomCreateWithoutLinkClassroomsInput, ClassroomUncheckedCreateWithoutLinkClassroomsInput>
    connectOrCreate?: ClassroomCreateOrConnectWithoutLinkClassroomsInput
    connect?: ClassroomWhereUniqueInput
  }

  export type LinkCreateNestedOneWithoutLinkClassroomInput = {
    create?: XOR<LinkCreateWithoutLinkClassroomInput, LinkUncheckedCreateWithoutLinkClassroomInput>
    connectOrCreate?: LinkCreateOrConnectWithoutLinkClassroomInput
    connect?: LinkWhereUniqueInput
  }

  export type ClassroomUpdateOneRequiredWithoutLinkClassroomsNestedInput = {
    create?: XOR<ClassroomCreateWithoutLinkClassroomsInput, ClassroomUncheckedCreateWithoutLinkClassroomsInput>
    connectOrCreate?: ClassroomCreateOrConnectWithoutLinkClassroomsInput
    upsert?: ClassroomUpsertWithoutLinkClassroomsInput
    connect?: ClassroomWhereUniqueInput
    update?: XOR<XOR<ClassroomUpdateToOneWithWhereWithoutLinkClassroomsInput, ClassroomUpdateWithoutLinkClassroomsInput>, ClassroomUncheckedUpdateWithoutLinkClassroomsInput>
  }

  export type LinkUpdateOneRequiredWithoutLinkClassroomNestedInput = {
    create?: XOR<LinkCreateWithoutLinkClassroomInput, LinkUncheckedCreateWithoutLinkClassroomInput>
    connectOrCreate?: LinkCreateOrConnectWithoutLinkClassroomInput
    upsert?: LinkUpsertWithoutLinkClassroomInput
    connect?: LinkWhereUniqueInput
    update?: XOR<XOR<LinkUpdateToOneWithWhereWithoutLinkClassroomInput, LinkUpdateWithoutLinkClassroomInput>, LinkUncheckedUpdateWithoutLinkClassroomInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type ClassroomCreateWithoutSchoolInput = {
    classroomNumber: number
    classroomOrder?: number
    classroomBorderColor: string
    classroomBackgroundColor: string
    classroomColor: string
    LinkClassrooms?: LinkClassroomCreateNestedManyWithoutClassroomInput
  }

  export type ClassroomUncheckedCreateWithoutSchoolInput = {
    classroomId?: number
    classroomNumber: number
    classroomOrder?: number
    classroomBorderColor: string
    classroomBackgroundColor: string
    classroomColor: string
    LinkClassrooms?: LinkClassroomUncheckedCreateNestedManyWithoutClassroomInput
  }

  export type ClassroomCreateOrConnectWithoutSchoolInput = {
    where: ClassroomWhereUniqueInput
    create: XOR<ClassroomCreateWithoutSchoolInput, ClassroomUncheckedCreateWithoutSchoolInput>
  }

  export type ClassroomCreateManySchoolInputEnvelope = {
    data: ClassroomCreateManySchoolInput | ClassroomCreateManySchoolInput[]
    skipDuplicates?: boolean
  }

  export type ClassroomUpsertWithWhereUniqueWithoutSchoolInput = {
    where: ClassroomWhereUniqueInput
    update: XOR<ClassroomUpdateWithoutSchoolInput, ClassroomUncheckedUpdateWithoutSchoolInput>
    create: XOR<ClassroomCreateWithoutSchoolInput, ClassroomUncheckedCreateWithoutSchoolInput>
  }

  export type ClassroomUpdateWithWhereUniqueWithoutSchoolInput = {
    where: ClassroomWhereUniqueInput
    data: XOR<ClassroomUpdateWithoutSchoolInput, ClassroomUncheckedUpdateWithoutSchoolInput>
  }

  export type ClassroomUpdateManyWithWhereWithoutSchoolInput = {
    where: ClassroomScalarWhereInput
    data: XOR<ClassroomUpdateManyMutationInput, ClassroomUncheckedUpdateManyWithoutSchoolInput>
  }

  export type ClassroomScalarWhereInput = {
    AND?: ClassroomScalarWhereInput | ClassroomScalarWhereInput[]
    OR?: ClassroomScalarWhereInput[]
    NOT?: ClassroomScalarWhereInput | ClassroomScalarWhereInput[]
    classroomId?: IntFilter<"Classroom"> | number
    classroomNumber?: IntFilter<"Classroom"> | number
    classroomOrder?: IntFilter<"Classroom"> | number
    classroomBorderColor?: StringFilter<"Classroom"> | string
    classroomBackgroundColor?: StringFilter<"Classroom"> | string
    classroomColor?: StringFilter<"Classroom"> | string
    schoolId?: IntNullableFilter<"Classroom"> | number | null
  }

  export type SchoolCreateWithoutClassroomsInput = {
    schoolName: string
  }

  export type SchoolUncheckedCreateWithoutClassroomsInput = {
    schoolId?: number
    schoolName: string
  }

  export type SchoolCreateOrConnectWithoutClassroomsInput = {
    where: SchoolWhereUniqueInput
    create: XOR<SchoolCreateWithoutClassroomsInput, SchoolUncheckedCreateWithoutClassroomsInput>
  }

  export type LinkClassroomCreateWithoutClassroomInput = {
    link: LinkCreateNestedOneWithoutLinkClassroomInput
  }

  export type LinkClassroomUncheckedCreateWithoutClassroomInput = {
    linkId: number
  }

  export type LinkClassroomCreateOrConnectWithoutClassroomInput = {
    where: LinkClassroomWhereUniqueInput
    create: XOR<LinkClassroomCreateWithoutClassroomInput, LinkClassroomUncheckedCreateWithoutClassroomInput>
  }

  export type LinkClassroomCreateManyClassroomInputEnvelope = {
    data: LinkClassroomCreateManyClassroomInput | LinkClassroomCreateManyClassroomInput[]
    skipDuplicates?: boolean
  }

  export type SchoolUpsertWithoutClassroomsInput = {
    update: XOR<SchoolUpdateWithoutClassroomsInput, SchoolUncheckedUpdateWithoutClassroomsInput>
    create: XOR<SchoolCreateWithoutClassroomsInput, SchoolUncheckedCreateWithoutClassroomsInput>
    where?: SchoolWhereInput
  }

  export type SchoolUpdateToOneWithWhereWithoutClassroomsInput = {
    where?: SchoolWhereInput
    data: XOR<SchoolUpdateWithoutClassroomsInput, SchoolUncheckedUpdateWithoutClassroomsInput>
  }

  export type SchoolUpdateWithoutClassroomsInput = {
    schoolName?: StringFieldUpdateOperationsInput | string
  }

  export type SchoolUncheckedUpdateWithoutClassroomsInput = {
    schoolId?: IntFieldUpdateOperationsInput | number
    schoolName?: StringFieldUpdateOperationsInput | string
  }

  export type LinkClassroomUpsertWithWhereUniqueWithoutClassroomInput = {
    where: LinkClassroomWhereUniqueInput
    update: XOR<LinkClassroomUpdateWithoutClassroomInput, LinkClassroomUncheckedUpdateWithoutClassroomInput>
    create: XOR<LinkClassroomCreateWithoutClassroomInput, LinkClassroomUncheckedCreateWithoutClassroomInput>
  }

  export type LinkClassroomUpdateWithWhereUniqueWithoutClassroomInput = {
    where: LinkClassroomWhereUniqueInput
    data: XOR<LinkClassroomUpdateWithoutClassroomInput, LinkClassroomUncheckedUpdateWithoutClassroomInput>
  }

  export type LinkClassroomUpdateManyWithWhereWithoutClassroomInput = {
    where: LinkClassroomScalarWhereInput
    data: XOR<LinkClassroomUpdateManyMutationInput, LinkClassroomUncheckedUpdateManyWithoutClassroomInput>
  }

  export type LinkClassroomScalarWhereInput = {
    AND?: LinkClassroomScalarWhereInput | LinkClassroomScalarWhereInput[]
    OR?: LinkClassroomScalarWhereInput[]
    NOT?: LinkClassroomScalarWhereInput | LinkClassroomScalarWhereInput[]
    classroomId?: IntFilter<"LinkClassroom"> | number
    linkId?: IntFilter<"LinkClassroom"> | number
  }

  export type LinkClassroomCreateWithoutLinkInput = {
    classroom: ClassroomCreateNestedOneWithoutLinkClassroomsInput
  }

  export type LinkClassroomUncheckedCreateWithoutLinkInput = {
    classroomId: number
  }

  export type LinkClassroomCreateOrConnectWithoutLinkInput = {
    where: LinkClassroomWhereUniqueInput
    create: XOR<LinkClassroomCreateWithoutLinkInput, LinkClassroomUncheckedCreateWithoutLinkInput>
  }

  export type LinkClassroomCreateManyLinkInputEnvelope = {
    data: LinkClassroomCreateManyLinkInput | LinkClassroomCreateManyLinkInput[]
    skipDuplicates?: boolean
  }

  export type LinkClassroomUpsertWithWhereUniqueWithoutLinkInput = {
    where: LinkClassroomWhereUniqueInput
    update: XOR<LinkClassroomUpdateWithoutLinkInput, LinkClassroomUncheckedUpdateWithoutLinkInput>
    create: XOR<LinkClassroomCreateWithoutLinkInput, LinkClassroomUncheckedCreateWithoutLinkInput>
  }

  export type LinkClassroomUpdateWithWhereUniqueWithoutLinkInput = {
    where: LinkClassroomWhereUniqueInput
    data: XOR<LinkClassroomUpdateWithoutLinkInput, LinkClassroomUncheckedUpdateWithoutLinkInput>
  }

  export type LinkClassroomUpdateManyWithWhereWithoutLinkInput = {
    where: LinkClassroomScalarWhereInput
    data: XOR<LinkClassroomUpdateManyMutationInput, LinkClassroomUncheckedUpdateManyWithoutLinkInput>
  }

  export type ClassroomCreateWithoutLinkClassroomsInput = {
    classroomNumber: number
    classroomOrder?: number
    classroomBorderColor: string
    classroomBackgroundColor: string
    classroomColor: string
    school?: SchoolCreateNestedOneWithoutClassroomsInput
  }

  export type ClassroomUncheckedCreateWithoutLinkClassroomsInput = {
    classroomId?: number
    classroomNumber: number
    classroomOrder?: number
    classroomBorderColor: string
    classroomBackgroundColor: string
    classroomColor: string
    schoolId?: number | null
  }

  export type ClassroomCreateOrConnectWithoutLinkClassroomsInput = {
    where: ClassroomWhereUniqueInput
    create: XOR<ClassroomCreateWithoutLinkClassroomsInput, ClassroomUncheckedCreateWithoutLinkClassroomsInput>
  }

  export type LinkCreateWithoutLinkClassroomInput = {
    linkName: string
    linkTitleFr?: string | null
    linkTitleBr?: string | null
    linkFullNameFr?: string | null
    linkFullNameBr?: string | null
    linkRedirection: string
    linkIcon: string
    linkMatter: string
    linkDescriptionFr?: string | null
    linkDescriptionBr?: string | null
    linkType?: string
  }

  export type LinkUncheckedCreateWithoutLinkClassroomInput = {
    linkId?: number
    linkName: string
    linkTitleFr?: string | null
    linkTitleBr?: string | null
    linkFullNameFr?: string | null
    linkFullNameBr?: string | null
    linkRedirection: string
    linkIcon: string
    linkMatter: string
    linkDescriptionFr?: string | null
    linkDescriptionBr?: string | null
    linkType?: string
  }

  export type LinkCreateOrConnectWithoutLinkClassroomInput = {
    where: LinkWhereUniqueInput
    create: XOR<LinkCreateWithoutLinkClassroomInput, LinkUncheckedCreateWithoutLinkClassroomInput>
  }

  export type ClassroomUpsertWithoutLinkClassroomsInput = {
    update: XOR<ClassroomUpdateWithoutLinkClassroomsInput, ClassroomUncheckedUpdateWithoutLinkClassroomsInput>
    create: XOR<ClassroomCreateWithoutLinkClassroomsInput, ClassroomUncheckedCreateWithoutLinkClassroomsInput>
    where?: ClassroomWhereInput
  }

  export type ClassroomUpdateToOneWithWhereWithoutLinkClassroomsInput = {
    where?: ClassroomWhereInput
    data: XOR<ClassroomUpdateWithoutLinkClassroomsInput, ClassroomUncheckedUpdateWithoutLinkClassroomsInput>
  }

  export type ClassroomUpdateWithoutLinkClassroomsInput = {
    classroomNumber?: IntFieldUpdateOperationsInput | number
    classroomOrder?: IntFieldUpdateOperationsInput | number
    classroomBorderColor?: StringFieldUpdateOperationsInput | string
    classroomBackgroundColor?: StringFieldUpdateOperationsInput | string
    classroomColor?: StringFieldUpdateOperationsInput | string
    school?: SchoolUpdateOneWithoutClassroomsNestedInput
  }

  export type ClassroomUncheckedUpdateWithoutLinkClassroomsInput = {
    classroomId?: IntFieldUpdateOperationsInput | number
    classroomNumber?: IntFieldUpdateOperationsInput | number
    classroomOrder?: IntFieldUpdateOperationsInput | number
    classroomBorderColor?: StringFieldUpdateOperationsInput | string
    classroomBackgroundColor?: StringFieldUpdateOperationsInput | string
    classroomColor?: StringFieldUpdateOperationsInput | string
    schoolId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type LinkUpsertWithoutLinkClassroomInput = {
    update: XOR<LinkUpdateWithoutLinkClassroomInput, LinkUncheckedUpdateWithoutLinkClassroomInput>
    create: XOR<LinkCreateWithoutLinkClassroomInput, LinkUncheckedCreateWithoutLinkClassroomInput>
    where?: LinkWhereInput
  }

  export type LinkUpdateToOneWithWhereWithoutLinkClassroomInput = {
    where?: LinkWhereInput
    data: XOR<LinkUpdateWithoutLinkClassroomInput, LinkUncheckedUpdateWithoutLinkClassroomInput>
  }

  export type LinkUpdateWithoutLinkClassroomInput = {
    linkName?: StringFieldUpdateOperationsInput | string
    linkTitleFr?: NullableStringFieldUpdateOperationsInput | string | null
    linkTitleBr?: NullableStringFieldUpdateOperationsInput | string | null
    linkFullNameFr?: NullableStringFieldUpdateOperationsInput | string | null
    linkFullNameBr?: NullableStringFieldUpdateOperationsInput | string | null
    linkRedirection?: StringFieldUpdateOperationsInput | string
    linkIcon?: StringFieldUpdateOperationsInput | string
    linkMatter?: StringFieldUpdateOperationsInput | string
    linkDescriptionFr?: NullableStringFieldUpdateOperationsInput | string | null
    linkDescriptionBr?: NullableStringFieldUpdateOperationsInput | string | null
    linkType?: StringFieldUpdateOperationsInput | string
  }

  export type LinkUncheckedUpdateWithoutLinkClassroomInput = {
    linkId?: IntFieldUpdateOperationsInput | number
    linkName?: StringFieldUpdateOperationsInput | string
    linkTitleFr?: NullableStringFieldUpdateOperationsInput | string | null
    linkTitleBr?: NullableStringFieldUpdateOperationsInput | string | null
    linkFullNameFr?: NullableStringFieldUpdateOperationsInput | string | null
    linkFullNameBr?: NullableStringFieldUpdateOperationsInput | string | null
    linkRedirection?: StringFieldUpdateOperationsInput | string
    linkIcon?: StringFieldUpdateOperationsInput | string
    linkMatter?: StringFieldUpdateOperationsInput | string
    linkDescriptionFr?: NullableStringFieldUpdateOperationsInput | string | null
    linkDescriptionBr?: NullableStringFieldUpdateOperationsInput | string | null
    linkType?: StringFieldUpdateOperationsInput | string
  }

  export type ClassroomCreateManySchoolInput = {
    classroomId?: number
    classroomNumber: number
    classroomOrder?: number
    classroomBorderColor: string
    classroomBackgroundColor: string
    classroomColor: string
  }

  export type ClassroomUpdateWithoutSchoolInput = {
    classroomNumber?: IntFieldUpdateOperationsInput | number
    classroomOrder?: IntFieldUpdateOperationsInput | number
    classroomBorderColor?: StringFieldUpdateOperationsInput | string
    classroomBackgroundColor?: StringFieldUpdateOperationsInput | string
    classroomColor?: StringFieldUpdateOperationsInput | string
    LinkClassrooms?: LinkClassroomUpdateManyWithoutClassroomNestedInput
  }

  export type ClassroomUncheckedUpdateWithoutSchoolInput = {
    classroomId?: IntFieldUpdateOperationsInput | number
    classroomNumber?: IntFieldUpdateOperationsInput | number
    classroomOrder?: IntFieldUpdateOperationsInput | number
    classroomBorderColor?: StringFieldUpdateOperationsInput | string
    classroomBackgroundColor?: StringFieldUpdateOperationsInput | string
    classroomColor?: StringFieldUpdateOperationsInput | string
    LinkClassrooms?: LinkClassroomUncheckedUpdateManyWithoutClassroomNestedInput
  }

  export type ClassroomUncheckedUpdateManyWithoutSchoolInput = {
    classroomId?: IntFieldUpdateOperationsInput | number
    classroomNumber?: IntFieldUpdateOperationsInput | number
    classroomOrder?: IntFieldUpdateOperationsInput | number
    classroomBorderColor?: StringFieldUpdateOperationsInput | string
    classroomBackgroundColor?: StringFieldUpdateOperationsInput | string
    classroomColor?: StringFieldUpdateOperationsInput | string
  }

  export type LinkClassroomCreateManyClassroomInput = {
    linkId: number
  }

  export type LinkClassroomUpdateWithoutClassroomInput = {
    link?: LinkUpdateOneRequiredWithoutLinkClassroomNestedInput
  }

  export type LinkClassroomUncheckedUpdateWithoutClassroomInput = {
    linkId?: IntFieldUpdateOperationsInput | number
  }

  export type LinkClassroomUncheckedUpdateManyWithoutClassroomInput = {
    linkId?: IntFieldUpdateOperationsInput | number
  }

  export type LinkClassroomCreateManyLinkInput = {
    classroomId: number
  }

  export type LinkClassroomUpdateWithoutLinkInput = {
    classroom?: ClassroomUpdateOneRequiredWithoutLinkClassroomsNestedInput
  }

  export type LinkClassroomUncheckedUpdateWithoutLinkInput = {
    classroomId?: IntFieldUpdateOperationsInput | number
  }

  export type LinkClassroomUncheckedUpdateManyWithoutLinkInput = {
    classroomId?: IntFieldUpdateOperationsInput | number
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}