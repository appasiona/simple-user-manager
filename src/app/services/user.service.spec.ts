import { TestBed } from '@angular/core/testing';

import { of } from 'rxjs';
import { UserI } from '../models/user.model';
import { UserService } from '../services/user.service';

describe('UserService', () => {
    let service: UserService;
    let mockUsers: UserI[];

    beforeEach(() => {
        mockUsers = [
            { id: 1, username: 'User1', expirationDate: new Date(), password: 'password1', enabled: true },
            { id: 2, username: 'User2', expirationDate: new Date(), password: 'password2', enabled: false }
        ];

        TestBed.configureTestingModule({
            providers: [UserService]
        });

        service = TestBed.inject(UserService);

        spyOn(service, 'getUsers').and.callFake(() => of(mockUsers));
        spyOn(service, 'addUser').and.callFake((user: UserI) => {
            mockUsers.push(user); 
            return of(user);
        });
        spyOn(service, 'updateUser').and.callFake((user: UserI) => {
            const index = mockUsers.findIndex(u => u.id === user.id);
            if (index !== -1) {
                mockUsers[index] = user; 
            }
            return of(user);
        });
        spyOn(service, 'deleteUser').and.callFake((id: number) => {
            mockUsers = mockUsers.filter(user => user.id !== id); 
            return of(true);
        });
    });

    it('should get users', (done) => {
        service.getUsers().subscribe(users => {
            expect(users).toEqual(mockUsers);
            done();
        });
    });


    it('should add a user', (done) => {
        const newUser: UserI = { id: 3, username: 'User3', expirationDate: new Date(), password: 'password3', enabled: true };

        service.addUser(newUser).subscribe(user => {
            expect(user).toEqual(newUser);

            service.getUsers().subscribe(users => {
                expect(users).toContain(newUser);
                done();
            });
        });
    });

   
    it('should update a user', (done) => {
        const updatedUser: UserI = { id: 1, username: 'UpdatedUser', expirationDate: new Date(), password: 'password1', enabled: true };

        service.updateUser(updatedUser).subscribe(user => {
            expect(user).toEqual(updatedUser);

            service.getUsers().subscribe(users => {
                expect(users.find(u => u.id === updatedUser.id)).toEqual(updatedUser);
                done();
            });
        });
    });

    
    it('should delete a user', (done) => {
        const userIdToDelete = 1;

        service.deleteUser(userIdToDelete).subscribe(result => {
            expect(result).toBeTrue();

            service.getUsers().subscribe(users => {
                expect(users.find(u => u.id === userIdToDelete)).toBeUndefined();
                done();
            });
        });
    });
});