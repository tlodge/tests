export type Question = {
	questionId:string,
	number: number,
	persist: boolean,
	question:string,
	type:string,
	values: object,
}

export type Button = {
  buttonId: string,
  name: string,
  description: string,
  type: string,
  batch: boolean,
  questions: Array<Question>
};

// This is the model of our module state
export type State = {
  buttons: Array<Button>
};
