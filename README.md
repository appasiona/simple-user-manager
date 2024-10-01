
# Simple User Manager

User Manager is an Angular 15 application that allows managing users through an intuitive interface. The application supports multilanguage, pagination, table sorting, filtering, and modals for creating, editing and deleting users.

## Features

- **Multilingual Support**: Language switch between English, Spanish, and Catalan using `ngx-translate`.
- **Pagination and Sorting**: Local pagination and sorting in tables using Angular Material.
- **Filtering**: Search users within the table.
- **Modals**: Dynamic modals for creating, editing and deleting users with built-in validation.
- **Responsive Design**: Mobile support with table scroll for columns that don't fit the screen.
- **Enhanced Accessibility**: Ensures the application meets basic accessibility guidelines.

## Demo

[Link to live demo](https://appasiona.github.io/simple-user-manager/) 

## Prerequisites

- Node.js v20.15.1
- Angular CLI v15.2.11
- NPM v9.8.1

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/appasiona/simple-user-manager.git
    ```
2. Navigate to the project folder:
    ```bash
    cd user-manager
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```

## Running the Application

To run the application in a development environment:

```bash
ng serve
```

## Running Tests

To run unit tests, use the following command:

```bash
ng test
```

## Key Functionalities

### Language Switching
Users can switch between different languages (English, Spanish, and Catalan) using the buttons located in the navigation bar.

### Users Component
The users component shows current users in application and includes:
- **Pagination**: Allows users to navigate through large sets of data.
- **Sorting**: Clickable column headers allow sorting of data.
- **Filtering**: Users can filter the table contents by typing a query in the input field.

### User Modal Component
Modal are used for both creating new users and editing existing ones using Angular Forms. The modal form includes:
- **Username** input field.
- **Password** and **Repeat Password** fields.
- **Expiration Date** picker.
- **Enabled** checkbox.

### SCSS Styling
The application uses SCSS for styling, with features such as:
- **Variables**: Manage colors and theme customization.
- **Responsive Design**: Media queries ensure the layout works across different screen sizes.
- **Flexbox**: Used to align and structure elements, especially for responsiveness.
  
### Accessibility Enhancements
The app follows accessibility guidelines by:
- Providing `aria-label` attributes for interactive elements.
- Ensuring color contrast is sufficient for readability.
- Supporting keyboard navigation throughout the interface.

## Contributions

If you'd like to contribute to the project, you can fork the repository, make your changes, and create a pull request. All contributions are welcome.


## Licence

This project is licensed under the MIT License. You can use this project as a template for your projects for free :)

