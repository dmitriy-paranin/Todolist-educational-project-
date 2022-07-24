import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TextField} from "@material-ui/core";

type EditableSpanType = {
title: string
     onChange: (newValue: string) => void
}

export function EditableSpan(props: EditableSpanType) {
     let [editMode, setEditMode] = useState(false);
     let [title, setTitle] = useState('');

     const activateEditMode = () => {
          setEditMode(true)
          setTitle(props.title)
     };
     const activateViewMode = () => {
          setEditMode(false);
          props.onChange(title);
     };

     const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

     return editMode
         ? <TextField id="outlined-basic"
                      variant="outlined"
                      onBlur={activateViewMode}
                      value={title}
                      autoFocus
                      onChange={onChangeTitleHandler}/>
         : <span onDoubleClick={activateEditMode}>{props.title}</span>

}
