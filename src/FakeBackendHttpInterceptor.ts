import { HttpEvent, HttpHandlerFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { delay, dematerialize, map, materialize, mergeMap, Observable, of } from 'rxjs';

const SIMULATED_NETWORK_DELAY = 750;

import { Product } from '@features/products/models/Product.model';
import productsData from '@data/products.json';
let products: Product[] = localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products') ?? '[]') : productsData;
if (!localStorage.getItem('products')) {
  localStorage.setItem('products', JSON.stringify(productsData));
}


import { User } from '@features/user/models/User.model';
import usersData from '@data/users.json';
let users: User[] = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users') ?? '[]') : usersData;
if (!localStorage.getItem('users')) {
  localStorage.setItem('users', JSON.stringify(usersData));
}

const routeExp = {
  users: /\/users$/,
  user: /\/users\/(\d+)$/,
  products: /\/products$/,
  product: /\/products\/(\d+)$/,
  favorite: /\/users\/(\d+)\/favorites\/(\d+)$/,
};


export const fakeBackendHttpInterceptor =
  (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
    const { url, method } = req;

    return of(null)
      .pipe(mergeMap(handleRoutes))
      .pipe(materialize()) // https://github.com/Reactive-Extensions/RxJS/issues/648
      .pipe(delay(SIMULATED_NETWORK_DELAY))
      .pipe(dematerialize());

    function handleRoutes(): Observable<HttpEvent<unknown>> {

      switch (true) {

        case url.match(routeExp.users) && method === 'GET':
          return response(501, {}); // Not implemented

        case url.match(routeExp.user) && method === 'GET':
          return handleGetUserById(req);

        case url.match(routeExp.favorite) && method === 'POST':
          return handleAddFavoriteProduct(req);

        case url.match(routeExp.favorite) && method === 'DELETE':
          return handleRemoveFavoriteProduct(req);

        case url.match(routeExp.products) && method === 'GET':
          return response(200, products.sort((p1: Product, p2: Product) => (p1.id < p2.id ? -1 : 1)));

        case url.match(routeExp.product) && method === 'GET':
          return handleGetProductById(req);

        default:
          console.log('fakeBackendHttpInterceptor(not intercepted)', url);
          return next(req);
      }

    }

  }


function handleGetUserById(req: HttpRequest<unknown>): Observable<HttpResponse<unknown>> {
  const user = filterById(getIdFromUrl(req.url), users);
  return user ? response(200, user) : response(404, {});
}

function handleAddFavoriteProduct(req: HttpRequest<unknown>): Observable<HttpResponse<unknown>> {
  const [_, userId, productId] = req.url.match(routeExp.favorite) ?? [];
  const unique = (arr: number[]) => arr.filter((value, index, arr) => index === arr.indexOf(value));
  const found = users.findIndex((user: User) => user.id === parseInt(userId ?? '0'));

  if (!found) return response(404, {});

  const favoriteProducts = users[found].favoriteProducts ?? [];
  users[found].favoriteProducts = unique([...favoriteProducts, parseInt(productId)]);
  localStorage.setItem('users', JSON.stringify(users));
  return response(201, {});
}

function handleRemoveFavoriteProduct(req: HttpRequest<unknown>): Observable<HttpResponse<unknown>> {
  const [_, userId, productId] = req.url.match(routeExp.favorite) ?? [];
  const found = users.findIndex((user: User) => user.id === parseInt(userId ?? '0'));

  if (!found) return response(404, {});

  const favoriteProducts = users[found].favoriteProducts ?? [];
  users[found].favoriteProducts = favoriteProducts.filter(id => id !== parseInt(productId));
  localStorage.setItem('users', JSON.stringify(users));
  return response(204, {});
}

function handleGetProductById(req: HttpRequest<unknown>): Observable<HttpResponse<unknown>> {
  const product = filterById(getIdFromUrl(req.url), products);
  return product ? response(200, product) : response(404, {});
}

function response(status: number, data: any): Observable<HttpResponse<unknown>> {
  return of(data).pipe(map(data => new HttpResponse({ status, body: data })));
}

const filterById = (id: number, arr: Array<any>): any | undefined => (arr.find((elem: any) => elem.id === id));

function getIdFromUrl(urlPath: string): number {
  const urlMatch = urlPath.match(/\d+$/) ?? [];
  return parseInt(urlMatch[0] ?? '0');
}
