'use strict';
// Math.round(num * 100) / 100
$(document).ready(function(){

//created function to run dashboard input twice
	var dashboardInput = function(){
			myApp.dashboard.DashboardInput();
			myApp.dashboard.DashboardInput();
	};

//TESTING PURPOSES @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

	myApp.htmlGen.test();

//END TESTING PURPOSES @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@



// //Javascript Rental Rate Assumptions first insert row -----------------------
		// myApp.htmlGen.rentalRateAssumptions();

//Javascript Market Rental Rate Assumptions first insert row -------------------
		myApp.htmlGen.marketRentalAssumptions();

// ============================================================================================================
// Start of ALL calculations for dashboard
// ============================================================================================================

	// var RRAlist = []; //Rental Rate Assumptions list
	// var MRAlist = []; //Market Rental Assumptions list


//RENTAL RATE ASSUMPTIONS Table calculations=====================
	myApp.rra.RRAInput();

//MARKET RENTAL ASSUMPTIONS Table calculations===================
	myApp.mra.MRAInput();



// ============================================================================================================
//Rental Rate Form Dynamic Table
// ============================================================================================================
	// adds one row to table when the 'add' button is clicked
	$("#rental_rate_form").on('click', function(event) {
		event.preventDefault();
		$('#Rental_Rate_Assumptions').find('tbody')
			.append($("<tr class = 'rent_row'>")
			.append($("<td>").html("<input type='text' name='proj_rents' class='proj_rents' placeholder='Project Rents'></td>"))
			.append($("<td>").html("<input type='number' name='total_units' class='total_units' placeholder='Total Units'></td>"))
			.append($("<td class = 'total_sf'></td>").text("0"))
			.append($("<td>").html("<input type='number' name='avg_sf_per_unit' class='avg_sf_per_unit' placeholder='Avg SF/Unit'></td>"))
			.append($("<td class = 'rent_per_sf'></td>").text("$0.00"))
			.append($("<td>").html("<input type='number' name='rent_per_unit' class='rent_per_unit' placeholder='Rent Per Unit'></td>"))
			.append($('<td>').html("<a>[X]</a></td>"))
			)

	// function to delete all additionally added rows from the Rental Rate Assumptions table
		$('tr[class^="rent_row"] a').on('click', function(event) {
			$(this).parent().parent().remove();
			RRAInput();
				myApp.dashboard.DashboardInput();
		});
	//Runs input function inside

		$('.rent_row').on('input', myApp.rra.RRAInput);
		$('#dashboard').on('input', dashboardInput);

	}); //end addrow function




// ============================================================================================================
//MARKET RENTAL ASSUMPTIONS Dynamic Table
// ============================================================================================================
	// adds one row to table when the 'add' button is clicked
	$('#Sale_Year_T').on('focusout', function(event){
		var saleYear = parseInt($('#Sale_Year_T').val());
		for(var i=0;i<saleYear-1;++i){
		//Inserts number of rows based on Sale Year in Dashboard
			var mraCounter = $('#Market_Rental_Assumptions_T tbody tr').length+1;
			while(saleYear+1 < mraCounter){
				$('#Market_Rental_Assumptions_T tbody tr').last().remove();
				mraCounter = $('#Market_Rental_Assumptions_T tbody tr').length+1;
			};
			$('#Market_Rental_Assumptions_T').find('tbody')
				.append($("<tr class = 'year_row' id='year_row_"+mraCounter+"'>")
				.append($("<td class='mkt_rent_year'>Year "+mraCounter+"</td>"))
				.append($("<td></td>"))
				.append($("<td>").html("<input type='number' name='mkt_rent_revenue' class='mkt_rent_revenue' placeholder='Revenue (%)'></td>"))
				.append($("<td>").html("<input type='number' name='mkt_rent_expenses' class='mkt_rent_expenses' placeholder='Expenses (%)'></td>"))
				.append($("<td>").html("<input type='number' name='mkt_rent_vacancy' class='mkt_rent_vacancy' placeholder='Vacancy (%)'></td>"))
				.append($("<td>").html("<input type='number' name='mkt_rent_concessions' class='mkt_rent_concessions' placeholder='Concessions (%)'></td>"))
				.append($("<td>").html("<input type='number' name='mkt_rent_credit_loss' class='mkt_rent_credit_loss' placeholder='Credit Loss (%)'></td>"))
				)
		//Inserts number of columns based on Sale Year in Pro Forma
		// 	console.log("Add Proforma rows==============")
		// 	$('#Proforma').find('#PF_Year_End')
		// 		.append($("<th>").text("Test"));
		// 	$('#Proforma').find('#PR_Rental_Income')
		// 		.append($("<td>").text("Test"));

		};
	}); //end addrow function

	var pInt = myApp.utils.pInt;
	$('#Sale_Year_T, #Market_Rental_Assumptions_T').on('input', function(event){
		var saleYear_T = parseInt($('#Sale_Year_T').val())+1;
		var pfCounter = saleYear_T;
	//Deletes all columns
		if (saleYear_T < pfCounter+1) {
			$('#Proforma tr td:not(:first)').each(function(){
				$(this).remove();
				// pfCounter = $('#Proforma .PF_Year_End td').length+1;
			});
			$('#Proforma tr td:first').each(function(){
				$(this).remove();
				// pfCounter = $('#Proforma .PF_Year_End td').length+1;
			})
		};
	//Inserts number of columns based on Sale Year in Dashboard
		for(var i = 0; i < saleYear_T; ++i) {
			pfCounter = $('#Proforma .PF_Year_End td').length+1;
			var Rental_Rate_Income_Total_T = parseInt($('#Rental_Income_Total_T').text());		
			var Other_Rate_Income_Total_T = parseInt($('#Other_Income_Total_T').text());
			$('#Proforma tr:first').append("<td class= 'PF_" + "year_" + pfCounter + "'>"+'Year '+ pfCounter +"</td>");
			if (i == 0){
			//Year 1 data grabbed from org_dashboard calculations
				$('#Proforma tr:nth-child(3)').append(
					"<td class= 'PF_Rental_Income'>" + 
					Rental_Rate_Income_Total_T * (1+($('#year_row_1 .mkt_rent_revenue').val())/100) + "</td>");
				$('#Proforma tr:nth-child(4)').append(
					"<td class= 'PF_Other_Income'>" + 
					Other_Rate_Income_Total_T * (1+($('#year_row_1 .mkt_rent_revenue').val())/100) + "</td>");
				$('#Proforma tr:nth-child(5)').append(
					"<td class= 'PF_Gross_Rental_Income'>" + 
					($('.PF_Rental_Income td:first-child').text()+$('.PF_Other_Income td:first-child').text()) + "</td>");
				
				// $('#Proforma tr:nth-child(6)').append(
				// 	"<td class= 'PF_Less_Vacancy'>" + 106 * (1+($('#year_row_1 .XXX').val())/100) + "</td>");
				// $('#Proforma tr:nth-child(7)').append(
				// 	"<td class= 'PF_Less_Concessions'>" + 107 * (1+($('#year_row_1 .XXX').val())/100) + "</td>");
				// $('#Proforma tr:nth-child(8)').append(
				// 	"<td class= 'PF_Less_Credit_Loss'>" + 108 * (1+($('#year_row_1 .XXX').val())/100) + "</td>");
				// $('#Proforma tr:nth-child(9)').append(
				// 	"<td class= 'PF_Net_Rental_Income'>" + 109 * (1+($('#year_row_1 .XXX').val())/100) + "</td>");
				
				// $('#Proforma tr:nth-child(10)').append(
				// 	"<td class= 'XXX'>" + 100 * (1+($('#year_row_1 .XXX').val())/100) + "</td>");
				// $('#Proforma tr:nth-child(11)').append(
				// 	"<td class= 'XXX'>" + 100 * (1+($('#year_row_1 .XXX').val())/100) + "</td>");
				// $('#Proforma tr:nth-child(12)').append(
				// 	"<td class= 'XXX'>" + 100 * (1+($('#year_row_1 .XXX').val())/100) + "</td>");
				// $('#Proforma tr:nth-child(13)').append(
				// 	"<td class= 'XXX'>" + 100 * (1+($('#year_row_1 .XXX').val())/100) + "</td>");
				// $('#Proforma tr:nth-child(14)').append(
				// 	"<td class= 'XXX'>" + 100 * (1+($('#year_row_1 .XXX').val())/100) + "</td>");
				
			} else {
			//All other year data calculated based on MRA table inputs
				console.log("pint weird row:", Rental_Rate_Income_Total_T*(1+($('#year_row_' + i + ' .mkt_rent_revenue').val())/100)	);
				console.log("prev selector for RI:", $('#Proforma .PF_Rental_Income td:nth-child('+ (i+1) +')').text() );
				console.log("=====END======")
				//Rental Incom
				$('#Proforma tr:nth-child(3)').append(
					"<td class= 'PF_Rental_Income'>" + 
					$('#Proforma .PF_Rental_Income td:nth-child('+ (i+1) +')').text()  *
					(1+($('#year_row_' + i + ' .mkt_rent_revenue').val())/100) +
					"</td>");
				//Other Income
				$('#Proforma tr:nth-child(4)').append(
					"<td class= 'PF_Other_Income'>" + 
					$('#Proforma .PF_Other_Income td:nth-child('+ (i+1) +')').text()  *
					(1+($('#year_row_' + i + ' .mkt_rent_revenue').val())/100) +
					"</td>");
			}
		}; //end for loop
			

	}); //end addrow function













// ============================================================================================================
	$('.rent_row').on('input', myApp.rra.RRAInput);
	$('#dashboard').on('input', dashboardInput);





}); //end of doc
