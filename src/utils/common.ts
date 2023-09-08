import { ALERT_PRIORITY, ALERT_STATE } from '../services/constants';
import { UserState } from '../store';
import { STALE_TIME } from "./constants";

export const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

export const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) ) + min;
}

export const paginationConfig = {
    keepPreviousData: true,
    staleTime: STALE_TIME
}

export const readFile = (
    file: File | null,
    type: "text" | "dataURL" | "arrayBuffer"
  ) => {
    return new Promise<string | ArrayBuffer>((r) => {
      const fileReader = new FileReader();
      fileReader.addEventListener("load", (e) => {
        if (e && e.target && e.target.result && file !== null) {
          r(e.target.result);
        }
      });
      if (file !== null) {
        if (type === "text") {
          fileReader.readAsText(file);
        } else if (type === "dataURL") {
          fileReader.readAsDataURL(file);
        } else if (type === "arrayBuffer") {
          fileReader.readAsArrayBuffer(file);
        }
      }
    });
  };

export const getSessionId = () => {
  const userString = localStorage.getItem('user')
  if(!userString) return ''
  try{
    const {state} = JSON.parse(userString) as {state: UserState}
    return state.user?.sessionId ?? ''
  }
  catch(err) {
    return ''
  }
}

export const isObject = (value: unknown) => {
  if(!value) return false
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return typeof value === 'object' && value.constructor === Object;
}

export const removeBlankProperties: (obj: any) => any = (obj) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  if (!isObject(obj)) return obj

  const result: { [key: string]: any } = {};
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  for (const key of Object.keys(obj)) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const value = obj[key];
    if (value !== null && value !== '') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      result[key] = removeBlankProperties(value);
    }
  }

  return result;
}

export const ellipsisText = (text: string, charCount: number) => {
  return `${text.slice(0, charCount).trim()}...`
}

export const getPriorityColor = (style: CSSModuleClasses, priority: string) => {
  if(priority === ALERT_PRIORITY.HIGH){
    return style.high
  }
  if(priority === ALERT_PRIORITY.MEDIUM){
    return style.medium
  }
  return style.low
}

export const getPriorityText = (priority: string) => {
  if(priority === ALERT_PRIORITY.HIGH){
    return 'Alta'
  }
  if(priority === ALERT_PRIORITY.MEDIUM){
    return 'Media'
  }
  return 'Baja'
}

export const getAlertStateText = (state: string) => {
  if(state === ALERT_STATE.PENDING){
    return 'No Resuelto'
  }
  if(state === ALERT_STATE.CANCELED){
    return 'Cancelado'
  }
  return 'Resuelto'
}

export const enumArray = (enumValues: object) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  const result = Object.values(enumValues)
  if(result.every((val) => typeof val === 'string')) return result as string[]
  return []
}