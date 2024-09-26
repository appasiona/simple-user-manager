import { UserI } from "../models/user.model";

export const MOCK_USERS: UserI[] = [
    { id: 1, username: "AdminUser", password: "admin123", expirationDate: new Date("2024-05-15T00:00:00.000Z"), enabled: false },
    { id: 2, username: "GuestUser", password: "guest2024", expirationDate: new Date("2024-12-25T00:00:00.000Z"), enabled: true },
    { id: 3, username: "JohnDoe", password: "johndoe01", expirationDate: new Date("2025-07-10T00:00:00.000Z"), enabled: true },
    { id: 4, username: "JaneSmith", password: "janesmith!", expirationDate: new Date("2024-11-15T00:00:00.000Z"), enabled: false },
    { id: 5, username: "MikeBrown", password: "mikeb1234", expirationDate: new Date("2026-03-20T00:00:00.000Z"), enabled: true },
    { id: 6, username: "SaraDavis", password: "sara2024", expirationDate: new Date("2025-01-05T00:00:00.000Z"), enabled: true },
    { id: 7, username: "TomWilson", password: "tomwilson2024", expirationDate: new Date("2024-09-01T00:00:00.000Z"), enabled: false },
    { id: 8, username: "EmilyJohnson", password: "emilyj2025", expirationDate: new Date("2025-04-30T00:00:00.000Z"), enabled: true },
    { id: 9, username: "ChrisLee", password: "chrislee12", expirationDate: new Date("2026-06-01T00:00:00.000Z"), enabled: true },
    { id: 10, username: "AnnaClark", password: "annac2024", expirationDate: new Date("2024-08-20T00:00:00.000Z"), enabled: false },
    { id: 11, username: "DavidMartin", password: "davidm2024", expirationDate: new Date("2025-10-01T00:00:00.000Z"), enabled: true },
    { id: 12, username: "LucyWilson", password: "lucyw2024", expirationDate: new Date("2024-03-15T00:00:00.000Z"), enabled: false },
    { id: 13, username: "StevenHall", password: "steven123", expirationDate: new Date("2025-11-30T00:00:00.000Z"), enabled: true },
    { id: 14, username: "OliviaJones", password: "olivia2025", expirationDate: new Date("2024-12-31T00:00:00.000Z"), enabled: true },
    { id: 15, username: "RyanMoore", password: "ryan2024", expirationDate: new Date("2026-02-28T00:00:00.000Z"), enabled: false },
    { id: 16, username: "NatalieKing", password: "natalie2024", expirationDate: new Date("2024-06-10T00:00:00.000Z"), enabled: true },
    { id: 17, username: "BrianWhite", password: "brianw2025", expirationDate: new Date("2025-08-01T00:00:00.000Z"), enabled: true },
    { id: 18, username: "LauraDavis", password: "laura2024", expirationDate: new Date("2025-03-15T00:00:00.000Z"), enabled: false },
    { id: 19, username: "JackScott", password: "jack2024", expirationDate: new Date("2024-11-01T00:00:00.000Z"), enabled: true },
    { id: 20, username: "MeganMartin", password: "megan2024", expirationDate: new Date("2025-09-30T00:00:00.000Z"), enabled: true }
];
