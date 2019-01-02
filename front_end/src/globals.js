import React from "react";

const ColorTheme = {
    darkPrimaryColor: '#1976D2',
    lightPrimaryColor: '#BBDEFB',
    primaryColor: '#2196F3',
    accentColor: "#FF9800",
    secondaryText: '#757575',
    divierColor: '#BDBDBD',
    passiveElement: '#757575',
};

const HistoryContext = React.createContext();

const VoteType = {
    No: {label: "No", enum: 0},
    Yes: {label: "Yes", enum: 1},
    YesIfNecessary: {label: "Yes, if necessary", enum: 2},

    getAll() {
      let result = [];
      for (let prop of Object.getOwnPropertyNames(this)) {
          if(typeof this[prop] === 'object')
            result.push(this[prop]);
      }
      return result;
    },

    // [Symbol.iterator]() {
    //     let index = 0;
    //     return {
    //         next: () => {
    //             if (index === Object.getOwnPropertyNames().length)
    //                 return {done: true};
    //             else {
    //                 const currentPropertyName = Object.getOwnPropertyNames(this)[index++];
    //                 return {value: this[currentPropertyName], done: false};
    //             }
    //         },
    //     }
    // }
};


export {ColorTheme, HistoryContext, VoteType};