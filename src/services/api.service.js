import JwtService from "@/services/jwt.service";
import axiosInstance from "@/plugins/axios";
import {API_ENDPOINT} from "@/common/constants";

class BaseApiService {}

export class ReadOnlyApiService extends BaseApiService {
  #resource;

  constructor(resource) {
    super();
    this.#resource = resource;
  }

  // запрос на получение списка сущностей
  async query(config = {}) {
    const { data } = await axiosInstance.get(this.#resource, config);
    return data;
  }

  // запрос на получение одной сущности по id
  async get(id, config = {}) {
    const { data } = await axiosInstance.get(`${this.#resource}/${id}`, config);
    return data;
  }
}

export class CrudApiService extends ReadOnlyApiService {
  #resource;
  constructor(resource) {
    super();
    this.#resource = resource;
  }

  // запрос на создание сущности
  async post(entity) {
    const { data } = await axiosInstance.post(this.#resource, entity);
    return data;
  }

  // запрос на обновление сущности
  async put(entity) {
    const { data } = await axiosInstance.put(
      `${this.#resource}/${entity.id}`,
      entity
    );
    return data;
  }

  // запрос на удаление сущности
  async delete(id) {
    const { data } = await axiosInstance.delete(`${this.#resource}/${id}`);
    return data;
  }
}

export class AuthApiService extends BaseApiService {
  setAuthHeader() {
    const token = JwtService.getToken();
    axiosInstance.defaults.headers.common["token"] = token ? token : "";
  }

  // отправляем логин/пароль для авторизации на сервере
  async login(params) {
    const { data } = await axiosInstance.post(`${API_ENDPOINT}/auth?IsDebug=1`, params);
    return data;
  }

  async logout() {
    const { data } = await axiosInstance.delete(`${API_ENDPOINT}/auth`);
    return data;
  }
}
