
const { jsPDF } = require("jspdf");
var autoTable = require('jspdf-autotable');
let {arial_bold} = require('./ARIAL-bold');
let {arial_normal} = require('./ARIAL-normal');
const generate_isb_certificate = async (student_name, course_name, certificate_template_image, course_completion_date) =>
{
	var doc            	= new jsPDF('p', 'pt', 'A4');
	var page_width     	= doc.internal.pageSize.getWidth();
	var page_height    	= doc.internal.pageSize.getHeight();

	// CERTIFICATE: START
	doc.addFileToVFS("ARIALBD-normal.ttf", arial_bold);
    doc.addFont("ARIALBD-normal.ttf", "ARIALBD", "normal");
	doc.setFont('ARIALBD');

	doc.addImage(certificate_template_image, 'JPEG', 0, 0, page_width, page_height,'','FAST');

	doc.setFontSize(27);
	doc.setFont('ARIALBD', 'normal');
	doc.text(page_width/2, 285, student_name, { maxWidth: 400, align: 'center'})

	// var table_width 	= course_name.length*14.8;
	// if (course_name.length >= 32)
	// {
	//     table_width 	= 473;
	// } 
	var course_name_width = doc.getTextWidth(course_name); // Get the width of the course name

    if (course_name.length >= 32)
	{
	    var table_width 	= 473;
	} 
	else
	{
		var table_width = course_name_width + 10;
	}

	// get the dimensions of the PDF document and the table
	var pdf_width 		= doc.internal.pageSize.width;
	// var pdf_height 		= doc.internal.pageSize.height;
	var table_margin 	= (pdf_width - table_width) / 2;

	var course_completion_date_y_position = 450;

	

	doc.setFont("ARIALBD"); 
	var table = doc.autoTable({
		startY: 415,
		body: [{course_name: course_name}],
		// theme: 'striped',
	    theme: 'plain',
	    tableWidth: table_width,
	    columnStyles: { 0: {halign: 'center', font: 'ARIALBD', fontStyle: 'bold'}},
	    styles: { fontSize: 24, textColor: '#0070ae' },
	    margin: { left: table_margin, right: table_margin },
	    didDrawPage: function (data) {
	      var table_bottom = data.cursor.y;
	      doc.setDrawColor(7, 149, 182);
	      doc.setLineWidth(1.0);
	      doc.line(data.settings.margin.left, table_bottom, data.settings.margin.left + table_width, table_bottom);
	      course_completion_date_y_position = table_bottom+20;
	    }
	});

	doc.addFileToVFS("ARIAL.TTF", arial_normal);
    doc.addFont("ARIAL.TTF", "ARIAL", "normal");
	doc.setFont('ARIAL');
	doc.setFontSize(16);
	doc.setFont('ARIAL', 'normal');

	//doc.setFontType("normal");
	doc.text(page_width/2, course_completion_date_y_position, course_completion_date, { maxWidth: 100, align: 'center' })
	// CERTIFICATE: END
	return doc.output('arraybuffer');
	//doc.save('generated_certificates/'+file_name);
}


const generate_isb_certificate_without_date = async (student_name, course_name, certificate_template_image) => {
	var doc = new jsPDF('p', 'pt', 'A4');
	var page_width = doc.internal.pageSize.getWidth();
	var page_height = doc.internal.pageSize.getHeight();

	// CERTIFICATE: START
	doc.addFileToVFS("ARIALBD-normal.ttf", arial_bold);
	doc.addFont("ARIALBD-normal.ttf", "ARIALBD", "normal");
	doc.setFont('ARIALBD');

	doc.addImage(certificate_template_image, 'JPEG', 0, 0, page_width, page_height, '', 'FAST');

	doc.setFontSize(27);
	doc.setFont('ARIALBD', 'normal');
	doc.text(page_width / 2, 285, student_name, { maxWidth: 400, align: 'center' })

	// var table_width 	= course_name.length*14.8;
	// if (course_name.length >= 32)
	// {
	//     table_width 	= 473;
	// } 
	var course_name_width = doc.getTextWidth(course_name); // Get the width of the course name

	if (course_name.length >= 32) {
		var table_width = 473;
	}
	else {
		var table_width = course_name_width + 10;
	}

	// get the dimensions of the PDF document and the table
	var pdf_width = doc.internal.pageSize.width;
	// var pdf_height 		= doc.internal.pageSize.height;
	var table_margin = (pdf_width - table_width) / 2;

	doc.setFont("ARIALBD");
	var table = doc.autoTable({
		startY: 395,
		body: [{ course_name: course_name }],
		// theme: 'striped',
		theme: 'plain',
		tableWidth: table_width,
		columnStyles: { 0: { halign: 'center', font: 'ARIALBD', fontStyle: 'bold' } },
		styles: { fontSize: 24, textColor: '#0070ae' },
		margin: { left: table_margin, right: table_margin },
		didDrawPage: function (data) {
			var table_bottom = data.cursor.y;
			doc.setDrawColor(7, 149, 182);
			doc.setLineWidth(1.0);
			doc.line(data.settings.margin.left, table_bottom, data.settings.margin.left + table_width, table_bottom);
		}
	});

	doc.addFileToVFS("ARIAL.TTF", arial_normal);
	doc.addFont("ARIAL.TTF", "ARIAL", "normal");
	doc.setFont('ARIAL');
	doc.setFontSize(16);
	doc.setFont('ARIAL', 'normal');

	//doc.setFontType("normal");
	// CERTIFICATE: END
	return doc.output('arraybuffer');
	//doc.save('generated_certificates/'+file_name);
}

module.exports = { generate_isb_certificate, generate_isb_certificate_without_date };