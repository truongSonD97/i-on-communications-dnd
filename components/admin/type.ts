export enum COMPONENT_TYPE {
  BUTTON = "BUTTON",
  PARAGRAPH = "PARAGRAPH",
}

export interface COMPONENT_DATA {
    id:string;
    type: COMPONENT_TYPE;
    name:string;
    label:string;
    alertMsg?:string
}

