//Library Schema
//Book collection

{
  ISBN :"" ,
  Author "",
  Tags : ["","",""] ,
  Borrower: "",  // Keep student ID 
  ReturnDate :""   
}


//Student Collect
{
  StudentID : "",
  StudentName: ""
}

db.Library.createIndex({ISBN:1})
db.Library.createIndex({Borrower:1})