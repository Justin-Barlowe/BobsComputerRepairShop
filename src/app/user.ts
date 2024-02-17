// Name: Justin Barlowe, Nolan Berryhill
// Date: 2/13/2024
// File: user.ts
// Description: User interface file

// User interface for the user object in the view all users component.
export interface User {
  _id: string;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  isDisabled: boolean;
  // Add the isEditMode property
  isEditMode?: boolean;
}