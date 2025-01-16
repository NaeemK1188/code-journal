interface Data
{
  view: string;
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


data.entries = readEntry();


function writeEntry():void
{
  const entryJSON = JSON.stringify(data.entries);
  localStorage.setItem('entry-storage', entryJSON);

}


function readEntry():Entry[]
{
  const entryList = localStorage.getItem('entry-storage');


  if(entryList)
  {
   
    return JSON.parse(entryList) as Entry[];
  }

  else
  {
    return [];
  }

}
