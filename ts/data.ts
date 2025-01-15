interface Data
{
  view: string;
  // we are creating an array of entries[]
  entries: Entry[];
  editing:null;
  nextEntryId:number;
}

const data:Data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};
