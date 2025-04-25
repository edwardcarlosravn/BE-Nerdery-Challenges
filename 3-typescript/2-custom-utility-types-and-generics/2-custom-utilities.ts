/**
 * Exercise #1: Filter object properties by type.
 *
 * Using a utility type `OmitByType`, this example demonstrates how to pick properties
 * from a type `T` whose values are *not* assignable to a specified type `U`.
 *
 * @example
 * type OmitBoolean = OmitByType<{
 *   name: string;
 *   count: number;
 *   isReadonly: boolean;
 *   isEnable: boolean;
 * }, boolean>;
 *
 * Resulting type:
 *
 * {
 * name: string;
 * count: number;
 * }
 */

// Add here your solution
type OmitByType<T,U> = {
    [K in keyof T as T[K] extends U ? never : K]: 
    T[K] extends object ? OmitByType<T[K], U> : T[K];
}
// Add here your example
type AppConfig = {
    id: string;
    timeout: number;
    retry: boolean;
    hooks: {
      onLoad: () => void;
      onError: (error: Error) => Promise<void>;
      settings: {
        verbose: boolean;
        logger: (msg: string) => void;
      };
    };
    services: Array<{
      name: string;
      start: () => Promise<void>;
      check: boolean;
    }>;
    anotherFunction : () => void;
};
type ConfigWithoutFunctions = OmitByType<AppConfig, Function | Promise<any>>;
const test: ConfigWithoutFunctions = {
    id: "app1",
    timeout: 5000,
    retry: true,
    hooks: {
      settings: {
        verbose: true
      }
    },
    services: [
      {
        name: "service1",
        check: true
      }
    ],
}
/**
 * Exercise #2: Implement the utility type `If<C, T, F>`, which evaluates a condition `C`
 * and returns one of two possible types:
 * - `T` if `C` is `true`
 * - `F` if `C` is `false`
 *
 * @description
 * - `C` is expected to be either `true` or `false`.
 * - `T` and `F` can be any type.
 *
 * @example
 * type A = If<true, 'a', 'b'>;  // expected to be 'a'
 * type B = If<false, 'a', 'b'>; // expected to be 'b'
 */

// Add here your solution
type If<C extends true | false, T , F> = C extends true ? T : F;
// Add here your example
type DynamicIf<C extends boolean, T, F> = If<C, T, F>;
type ResultExample<T extends boolean> = DynamicIf<T, 'success', 'error'>;

type A = ResultExample<true>; 
type B = ResultExample<false>;  
type C = ResultExample<boolean>;
/**
 * Exercise #3: Recreate the built-in `Readonly<T>` utility type without using it.
 *
 * @description
 * Constructs a type that makes all properties of `T` readonly.
 * This means the properties of the resulting type cannot be reassigned.
 *
 * @example
 * interface Todo {
 *   title: string;
 *   description: string;
 * }
 *
 * const todo: MyReadonly<Todo> = {
 *   title: "Hey",
 *   description: "foobar"
 * };
 *
 * todo.title = "Hello";       // Error: cannot reassign a readonly property
 * todo.description = "barFoo"; // Error: cannot reassign a readonly property
 */

// Add here your solution
type MyReadOnly<T> = {
    readonly [K in keyof T]: T[K] extends object ? MyReadOnly<T[K]> : T[K];
};
// Add here your example
type ImmutableAppState = MyReadOnly<AppConfig>;
const appState: ImmutableAppState = {
    id: "app1",
    timeout: 5000,
    retry: true,
    hooks: {
        onLoad: () => {},
        onError: async (error: Error) => {
            console.error(error);
        },
        settings: {
        verbose: true,
            logger: (msg: string) => console.log(msg)
        }
    },
    services: [
      {
        name: "service1",
        start: async () => {
          console.log("Service started");
        },
        check: true
      }
    ],
    anotherFunction: () => {}
};
// appState.id = "app2"; 
// appState.hooks.onLoad = () => {console.log('Hi everyone')}; 
// appState.hooks.onLoad(); 
// appState.services[0].start = async () => {};
/**
 * Exercise #4: Recreate the built-in `ReturnType<T>` utility type without using it.
 *
 * @description
 * The `MyReturnType<T>` utility type extracts the return type of a function type `T`.
 *
 * @example
 * const fn = (v: boolean) => {
 *   if (v) {
 *     return 1;
 *   } else {
 *     return 2;
 *   }
 * };
 *
 * type a = MyReturnType<typeof fn>; // expected to be "1 | 2"
 */

// Add here your solution
type MyReturnType<T extends (...args: any[]) => any> = T extends (...args:any[]) => infer C ? C : never;
// Add here your example
const fn = (v: boolean) => {
    if (v) {
      return 1;
    } else {
      return 2;
    }
};
type Result = MyReturnType<typeof fn>;
async function fetchData(): Promise<{ id: number; name: string }> {
    return { id: 1, name: "Data" };
}
type LoggerFunction = AppConfig["hooks"]["settings"]["logger"];
type OnErrorReturn = MyReturnType<AppConfig["hooks"]["onError"]>;
/**
 * Exercise #5: Extract the type inside a wrapped type like `Promise`.
 *
 * @description
 * Implement a utility type `MyAwaited<T>` that retrieves the type wrapped in a `Promise` or similar structure.
 *
 * If `T` is `Promise<ExampleType>`, the resulting type should be `ExampleType`.
 *
 * @example
 * type ExampleType = Promise<string>;
 *
 * type Result = MyAwaited<ExampleType>; // expected to be "string"
 */

// Add here your solution
type MyAwaited<T> = T extends PromiseLike <infer R> ? (R extends PromiseLike<any> ? MyAwaited<R> : R) : T;
// Add here your example
async function fetchUser() {
    return { id: 1, name: "User" };
}
type FetchResult = ReturnType<typeof fetchUser>; // Promise<{ id: number, name: string }>
type UserType = MyAwaited<FetchResult>;    
type Example3 = Promise<Promise<Promise<boolean>>>;
type Result3 = MyAwaited<Example3>;
type T3 = {
    then: (onfulfilled: (value: boolean) => any) => any
}
const a : MyAwaited<T3> = true;
/**
 * Exercise 6: Create a utility type `RequiredByKeys<T, K>` that makes specific keys of `T` required.
 *
 * @description
 * The type takes two arguments:
 * - `T`: The object type.
 * - `K`: A union of keys in `T` that should be made required.
 *
 * If `K` is not provided, the utility should behave like the built-in `Required<T>` type, making all properties required.
 *
 * @example
 * interface User {
 *   name?: string;
 *   age?: number;
 *   address?: string;
 * }
 *
 * type UserRequiredName = RequiredByKeys<User, 'name'>;
 * expected to be: { name: string; age?: number; address?: string }
 */

// Add here your solution
type Flatten<T> = { [K in keyof T]: T[K] };
type RequiredByKeys<T, K extends keyof T = keyof T> = Flatten<
    Omit<T, K> & Required<Pick<T, K>>
>;
// Add here your example
interface MixedUser {
    id: string;
    name?: string;
    email?: string;
}

type MixedRequired = RequiredByKeys<MixedUser, 'name'>;
interface Complex {
    a?: { b: number };
    c?: string[];
}

type ComplexRequired = RequiredByKeys<Complex, 'a'>;