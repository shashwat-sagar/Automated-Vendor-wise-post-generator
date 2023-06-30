var doc = document.getElementById("doc").innerHTML;

const print = () => {
  console.log("Hello World");
  var printWindow = window.open("", "Print Window", "height=1200,width=1200");
  printWindow.document.write("<html><head><title>Print Window</title>");
  printWindow.document.write("<link rel='stylesheet' href='style.css'>");
  printWindow.document.write(
    "<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'/>"
  );
  printWindow.document.write("</head>");
  printWindow.document.write("<body >", doc);
  printWindow.document.write("</body></html>");
  printWindow.document.close();
  printWindow.print();
};
