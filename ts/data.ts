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
  entries: [], // array of objects entry
  editing: null,
  nextEntryId: 1,
};



function writeEntry():void
{
  const entryJSON = JSON.stringify(data.entries);
  localStorage.setItem('entry-storage', entryJSON);

}

function readEntry():Data[]
{
  const entryList = localStorage.getItem('entry-storage');

  // or if (entry != null)
  if(entryList)
  {
    // or const newEntryList:Data[] = JSON.parse(entryList);
    return JSON.parse(entryList) as Data[];
  }

  else
  {
    return [];
  }

}
