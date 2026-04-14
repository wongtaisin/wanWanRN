/**
 * Token 持久化存储
 * 支持多种存储后端
 */

export interface ITokenStorage {
  getToken(): Promise<string | null>
  setToken(token: string): Promise<void>
  removeToken(): Promise<void>
}

/**
 * 内存存储（默认）
 */
class MemoryTokenStorage implements ITokenStorage {
  private token: string | null = null

  async getToken(): Promise<string | null> {
    return this.token
  }

  async setToken(token: string): Promise<void> {
    this.token = token
  }

  async removeToken(): Promise<void> {
    this.token = null
  }
}

let tokenStorage: ITokenStorage = new MemoryTokenStorage()

/**
 * 设置 token 存储实现
 * 用于替换默认的内存存储，比如 AsyncStorage
 */
export const setTokenStorage = (storage: ITokenStorage): void => {
  tokenStorage = storage
}

/**
 * 获取 token 存储实例
 */
export const getTokenStorage = (): ITokenStorage => {
  return tokenStorage
}

export default tokenStorage
