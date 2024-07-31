export interface StrengthItem {
  _id: string;
  title: string;
  description: string;
  additionalText: string;
}
export interface SolutionItem {
  _id: string;
  title: string;
  description: string;
  info?: string;
  urlForTedTalk?: string;
  urlForLiterature?: string;
}
export interface ProposedSolution {
  solutionDescription: string;
  solutionTitle: string;
  playerName: string;
  likes: number;
}
export interface ActionItem {
  _id: string;
  title: string;
  description: string;
  additionalText: string;
  numberOfUpperTokens: number;
}
export interface QuestionItem {
  _id: string;
  title: string;
  description: string;
  language: string;
}
export interface GameTemplateItem {
  _id: string;
  gameTitle: string;
  gameTemplateId: string;
  preselectedSolutionIds: string[];
  preselectedStrengthIds: string[];
  preselectedQuestionIds: string[];
  preselectedActionIds: string[];
}
export interface Player {
  _id: string;
  nickName: string;
  email: string;
  isReady: boolean;
}
export interface Group {
  groupCode: string;
  gameCode: string;
  players: Player[];
}
