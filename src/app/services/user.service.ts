import { Injectable } from '@angular/core';
import { map, Observable, timer } from 'rxjs';
import { MOCK_USERS } from '../mock/mock.data';
import { UserI } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor() { }

    //Simulate backend delay
    private simulateDelay<T>(data: T, delay: number): Observable<T> {
        return timer(delay).pipe(map(() => data));
    }

    getUsers(): Observable<UserI[]> {
        return this.simulateDelay(MOCK_USERS, 1500);
    }

    addUser(user: UserI): Observable<UserI> {
        const nextId = Math.max(...MOCK_USERS.map(user => user.id)) + 1;
        user.id = nextId;  
        MOCK_USERS.push(user);
        return this.simulateDelay(user, 200);
    }

    updateUser(user: UserI): Observable<UserI> {
        const index = MOCK_USERS.findIndex(u => u.id === user.id);
        if (index !== -1) {
            MOCK_USERS[index] = user;
        }
        return this.simulateDelay(user, 200);
    }

    deleteUser(id: number): Observable<boolean> {
        const index = MOCK_USERS.findIndex(user => user.id === id);
        if (index !== -1) {
            MOCK_USERS.splice(index, 1);
        }
        return this.simulateDelay<boolean>(true, 200);
    }
}
