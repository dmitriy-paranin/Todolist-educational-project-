import {userReducer} from "./user-reducer";

test ('user reducer should increment only age', ()=>{
    const startState = { age: 20, childrenCount: 2, name: 'Dima' };
    const endState = userReducer(startState, {type: 'INCREMENT-AGE'})

    expect(endState.age).toBe(21);
    expect(endState.childrenCount).toBe(2);
});

test('user reducer should increment only childrenCount', ()=>{
    const startState = { age: 20, childrenCount: 2, name: 'Dima' };
    const endState = userReducer(startState, {type: 'ICREMENT-CHILDREN-COUNT'})

    expect(endState.age).toBe(20);
    expect(endState.childrenCount).toBe(3);
});

test ('user reducer should change name of user', ()=>{
    const startState = {name: "Dima", age: 20, childrenCount: 2};
    const newName = "Dimoooon!";
    const endState = userReducer(startState, {type:"CHANGE-NAME", newName: newName})

    expect(endState.name).toBe(newName);
});

