
type Image={uri?:string;}

interface ContactArray{
    id:string;
    image?:Image
    name:string;
    }


type state = {
    items:  ContactArray[];
    contactsArray: ContactArray[];
    selected: {
      [key: string]: boolean;
    };
  };
  
  type Action =
    | { type: "array"; value: ContactArray[] }
    | { type: "add"; value: ContactArray; selected: string }
    | { type: "remove"; selected: string };
  
 export const reducer = (state: state, action: Action): state => {
    switch (action.type) {
      case "add":
        //add the checked contact to the array
        //and return true to selected
  
        return {
          ...state,
          items: [...state.items, action.value],
          selected: {
            ...state.selected,
            [action.selected]: true,
          },
        };
  
      case "remove":
        // remove the unchecked contact from the array
        let removeItem = state.items.map((i) => i.id).indexOf(action.selected);
        state.items.splice(removeItem, 1);
        //and return false to selected
        return {
          ...state,
          items: [...state.items],
          selected: {
            ...state.selected,
            [action.selected]: false,
          },
        };
  
      case "array":
        // saved contacts array or search array
  
        return {
          ...state,
          contactsArray: [...action.value],
        };
    }
  };