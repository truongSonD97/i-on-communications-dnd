export enum COMPONENT_TYPE {
  BUTTON = "BUTTON",
  PARAGRAPH = "PARAGRAPH",
  IMAGE = "IMAGE"
}

export interface COMPONENT_DATA {
    id:string;
    type: COMPONENT_TYPE;
    name:string;
    label:string;
    alertMsg?:string
    url?:string
}

