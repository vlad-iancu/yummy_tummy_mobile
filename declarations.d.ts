declare module "*.svg" {
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}
declare module "react-native-encrypted-storage" {
  export default class EncryptedStorage {
    /**
     * Writes data to the disk, using SharedPreferences or KeyChain, depending on the platform.
     * @param {string} key - A string that will be associated to the value for later retrieval.
     * @param {string} value - The data to store.
     */
    static setItem(key: string, value: string): Promise<void>;
    /**
     * Writes data to the disk, using SharedPreferences or KeyChain, depending on the platform.
     * @param {string} key - A string that will be associated to the value for later retrieval.
     * @param {string} value - The data to store.
     * @param {Function} cb - The function to call when the operation completes.
     */
    /**
     * Retrieves data from the disk, using SharedPreferences or KeyChain, depending on the platform and returns it as the specified type.
     * @param {string} key - A string that is associated to a value.
     */
    static getItem(key: string): Promise<string | null>;
    /**
     * Retrieves data from the disk, using SharedPreferences or KeyChain, depending on the platform and returns it as the specified type.
     * @param {string} key - A string that is associated to a value.
     * @param {Function} cb - The function to call when the operation completes.
     */    /**
   * Deletes data from the disk, using SharedPreferences or KeyChain, depending on the platform.
   * @param {string} key - A string that is associated to a value.
   */
    static removeItem(key: string): Promise<void>;
    /**
     * Deletes data from the disk, using SharedPreferences or KeyChain, depending on the platform.
     * @param {string} key - A string that is associated to a value.
     * @param {Function} cb - The function to call when the operation completes.
     */
    /**
     * Clears all data from disk, using SharedPreferences or KeyChain, depending on the platform.
     */
    static clear(): Promise<void>;
    /**
     * Clears all data from disk, using SharedPreferences or KeyChain, depending on the platform.
     * @param {Function} cb - The function to call when the operation completes.
     */
  }
}
declare module "react-native-ico-flags" {
  export default class Icon extends React.Component<any>{
    constructor(props: any)
  }
}