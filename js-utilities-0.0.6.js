/*!
 * JsUtilities JavaScript library v0.0.6
 * (c) Dabrowski-Software-Development (https://github.com/dabrowski-software-development/JsUtilityFunctions)
 * License: MIT (http://www.opensource.org/licenses/mit-license.php)
 */

(function (window) {

    var self = this;
	
	function calculateNumberOfDaysForCurrentMonthInternal(currentMonth, currentYear) {
		if(currentMonth = 0) return 31;
		else if(currentMonth = 1) {
			if(currentYear % 4 == 0)
				return 29;
			return 28;
		}
		else if(currentMonth = 2) return 31;
		else if(currentMonth = 3) return 30;
		else if(currentMonth = 4) return 31;
		else if(currentMonth = 5) return 30;
		else if(currentMonth = 6) return 31;
		else if(currentMonth = 7) return 31;
		else if(currentMonth = 8) return 30;
		else if(currentMonth = 9) return 31;
		else if(currentMonth = 10) return 30;
		else if(currentMonth = 11) return 31;		
				
	}
	
	function calculateCountdownTimeInternal(deadlineDate, yearMark, monthMark, dayMark, hourMark, minuteMark, secondMark) {
	  var countdown = "time is up";
	  var currentDate = new Date();
	  var totalNumberOfMiliseconds = new Date(deadlineDate) - currentDate;
	  
	  if(totalNumberOfMiliseconds > 0) {
		var seconds = 0;
		var minutes = 0;
		var hours = 0;
		var days = 0;
		var months = 0;
		var years = 0;

		for(var peek = totalNumberOfMiliseconds / 1000; peek > 0; peek -= 1) {
		   seconds++;
		   if(seconds==60) {
			seconds = 0;
			minutes++;
		   }
		   if(minutes==60) {
			minutes=0;
			hours++;
		   }
		   if(hours==24) {
			hours=0;
			days++;
		   }
		   if(days==calculateNumberOfDaysForCurrentMonthInternal(currentDate.getMonth(), currentDate.getFullYear())) {
			days=0;
			months++;
		   }
		   if(months==12) {
			months=0;
			years++;
		   }
		}
		
		if(seconds.toString().length < 2)
			seconds = "0" + seconds;
		if(minutes.toString().length < 2)
			minutes = "0" + minutes;
		if(hours.toString().length < 2)
			hours = "0" + hours;
		if(days.toString().length < 2)
			days = "0" + days;
		if(months.toString().length < 2)
			months = "0" + months;		
		if(years.toString().length < 2)
			years = "0" + years;	
		
		countdown = years + (yearMark != undefined ?  yearMark : "") +
					months + (monthMark != undefined ? monthMark : "") +
					days + (dayMark != undefined ? dayMark : "") +
					hours + (hourMark != undefined ? hourMark : "") +
					minutes  + (minuteMark != undefined ? minuteMark : "") +
					seconds + (secondMark != undefined ? secondMark : "");
	  }

	  return countdown;		
	}
	
    function calculateDateDifferenceInternal(startDate, endDate) {
        var sDate = startDate;
        var currentDate = endDate == undefined ? getCurrentDateInternal() : endDate;
				
        var startYear = sDate.getFullYear();
        var startMonth = sDate.getMonth();

        var currentYear = currentDate.getFullYear();
        var currentMonth = currentDate.getMonth();

        var experience = "";

        if (sDate < currentDate) {
            var months = currentMonth - startMonth;
            if (months < 1) {
                if (months < 0) {
                    var years = currentYear - startYear - 1;
                    if (years) {
                        experience = years + " year" + (years > 1 ? "s" : "") + " " + (12 - Math.abs(months)) + " month" + (Math.abs(months) >= 1 ? "s" : "");
                    }
                    else {
                        experience = (12 - Math.abs(months)) + " month" + (Math.abs(months) >= 1 ? "s" : "");
                    }
                }
                else {
                    var years = currentYear - startYear;
                    if (years) {
                        experience = years + " year" + (years > 1 ? "s" : "");
                    }
                    else {
                        experience = "current month";
                    }
                }
            }
            else {
                var years = currentYear - startYear;
                if (years) {
                    experience = years + " year" + (years > 1 ? "s" : "") + " " + months + " month" + (months > 1 ? "s" : "");
                }
                else {
                    experience = months + " month" + (months > 1 ? "s" : "");
                }
            }
        }
        else if (sDate > currentDate) {
            experience += "start "
            var years = startYear - currentYear;
            var months = startMonth - currentMonth;

            if (years && months < 0) {
                var months_n = (12 - Math.abs(months));
                experience += months_n > 1 ? "in " + months_n + " months' time" : "in " + months_n + " month time";
            }
            else if (years && months == 0) {
                experience += "in 1 year time";
            }
            else if (years && months > 0) {
                experience += "in " + years + " year " + months + (months > 1 ? " months' time" : " month time");
            }
            else if (years && years > 1) {
                experience = "";
            }
            else {
                experience += "in " + months + (months > 1 ? " months' time" : " month time");
            }
        }
        else {
            experience = "current month";
        }

        return experience;
    }

    function getCurrentDateInternal() {
        return new Date();
    }

    function getCurrentDateFormattedInternal(date) {
        var day = date.getDate();
        var month = date.getMonth();
        var year = date.getFullYear();

        return year + "-" + month + "-" + day;
    }


    /*sliceOff details */
    function sliceOffInternal(inputArray, arrayOfIndicesToRemoveItemsFromInputArray, applyToObject, optionalArrayOfObjectProps) {
        if (applyToObject && optionalArrayOfObjectProps == undefined)
            throw "third parameter optionalArrayOfObjectProps is undefinded. To remove objects without filtering supply empty array";

        var clone = [];
        for (var i = 0; i < inputArray.length; i++) {
            clone.push(inputArray[i]);
        }

        var resultArray = [];

        if (applyToObject && optionalArrayOfObjectProps.length > 0) {
            var properties = [];
            var propertiesValues = [];

            for (var i = 0, oLength = optionalArrayOfObjectProps.length; i < oLength; i++) {
                for (var property in optionalArrayOfObjectProps[i]) {
                    properties.push(property);
                    propertiesValues.push(optionalArrayOfObjectProps[i][property]);
                }
            }

            if (properties.length != propertiesValues.length)
                throw "number of properties and supplied values mismatch";

            resultArray = removeFilteredItemsFromArrayInternal(clone, properties, propertiesValues);
        }
        else {
            if (arrayOfIndicesToRemoveItemsFromInputArray.length > 0) {
                var isOrderPreserved = checkIfOrderIsPreservedInternal(arrayOfIndicesToRemoveItemsFromInputArray);
                resultArray = removeItemsFromArrayInternal(clone, arrayOfIndicesToRemoveItemsFromInputArray, isOrderPreserved);
            }
        }

        return resultArray;
    }

    function checkIfOrderIsPreservedInternal(arrayOfIndicesToRemoveItemsFromInputArray) {
        var isOrderPreserved = true;

        var temp = arrayOfIndicesToRemoveItemsFromInputArray[0];

        if (arrayOfIndicesToRemoveItemsFromInputArray[1] != undefined) {
            for (var i = 1; i < arrayOfIndicesToRemoveItemsFromInputArray.length; i++) {
                temp += 1;
                if (temp != arrayOfIndicesToRemoveItemsFromInputArray[i]) {
                    isOrderPreserved = false;
                    break;
                }
            }
        }

        return isOrderPreserved;
    }

    function removeFilteredItemsFromArrayInternal(inputArray, properties, propertiesValues) {

        for (var i = 0; i < inputArray.length; i++) {
            var obj = inputArray[i];
            var toBeRemoved =  ifQualifiesToDeletionInternal(obj, properties, propertiesValues);
            if (toBeRemoved)
                inputArray = removeObjectInternal(inputArray, obj);
        }

        return inputArray;
    }

    function removeItemsFromArrayInternal(inputArray, arrayOfIndicesToRemoveItemsFromInputArray, isOrderPreserved) {
        var resultArray = [];

        if (isOrderPreserved && arrayOfIndicesToRemoveItemsFromInputArray.length === 1) {
            inputArray.splice(arrayOfIndicesToRemoveItemsFromInputArray[0] + 1, inputArray.length);
            resultArray = inputArray;
        }
        else if (isOrderPreserved && arrayOfIndicesToRemoveItemsFromInputArray.length > 1) {
            if (arrayOfIndicesToRemoveItemsFromInputArray[0] === 0) {
                inputArray.splice(arrayOfIndicesToRemoveItemsFromInputArray.length, inputArray.length);
                resultArray = inputArray;
            }
            else {
                var temporaryArray = inputArray.splice(0, arrayOfIndicesToRemoveItemsFromInputArray[0]) + ",";
                inputArray.splice(0, arrayOfIndicesToRemoveItemsFromInputArray.length);
                temporaryArray += inputArray;
                resultArray = temporaryArray;
            }
        }
        else {
            var inputArrayClones = [];
            var removedItems = [];
            for (var j = 0; j < arrayOfIndicesToRemoveItemsFromInputArray.length; j++) {
                var array_j = [];
                for (var k = 0; k < inputArray.length; k++) {
                    array_j[k] = inputArray[k];
                }
                inputArrayClones[j] = array_j;
            }

            for (var l = 0; l < arrayOfIndicesToRemoveItemsFromInputArray.length; l++) {
                removedItems.push(inputArrayClones[l].splice(arrayOfIndicesToRemoveItemsFromInputArray[l], 1)[0]);
            }

            resultArray = convertArrayOfArraysToOneDimensionalArrayOfUniqueItemsInternal(inputArrayClones, removedItems);
        }

        return resultArray;
    }

    function convertArrayOfArraysToOneDimensionalArrayOfUniqueItemsInternal(arrayOfArrays, removedItems) {
        var result = [];

        for (var i = 0, m_length = arrayOfArrays.length; i < m_length; i++) {
            arrayOfArrays[i].map(function (item) {
                removedItems.indexOf(item) === -1 && result.indexOf(item) === -1 ? result.push(item) : "";
            });
        }

        return result;
    }

    function  ifQualifiesToDeletionInternal(obj, properties, propertiesValues) {
        var qualifies = false;

        for (var i = 0, m_length = properties.length; i < m_length; i++) {
            var prop = properties[i];
            var val = propertiesValues[i];

            if (obj.hasOwnProperty(prop) && obj[prop] === val) {
                qualifies = true;
                break;
            }
        }

        return qualifies;
    }

    function removeObjectInternal(inputArray, obj) {
        var indexOf = inputArray.indexOf(obj);
        inputArray.splice(indexOf, 1);
        return inputArray;
    }
    /*sliceOff details */


    /*insertInternal details*/
    function insertInternal(originalArray, newArray, startIndex) {

        if (startIndex > originalArray.length)
            throw "startIndex out of range"

        var result = [];

        if (startIndex > 0) {
            result = result.concat(originalArray.slice(0, startIndex));
            result = result.concat(newArray);
            result = result.concat(originalArray.slice(startIndex));
        }
        else {
            result = newArray.concat(originalArray);
        }

        return result;
    }
    /*insertInternal details*/


    /*reverseInternal details*/
    function reverseInternal(input) {
        var result = "";

        for (var i = input.length - 1; i >= 0; i--) {
            result += input[i];
        }

        return result;
    }
    /*reverseInternal details*/

    /*countNumberOfCharsInternal details*/
    function countNumberOfCharsInternal(inputString, character) {
        var result = 0;

        for (var i = 0, isLength = inputString.length; i < isLength; i++) {
            if (inputString[i] === character)
                result += 1;
        }

        return result;
    }
    /*countNumberOfCharsInternal details*/


    /* fills n child contaainers with external data */
    function fillChildContainersUnderGivenParentContainerInternal(relativePathToExternalDataSource,
                                                                  parentContainerCssClass,
                                                                  dataDivContainerCssClassName, dataDivLineDefinitionContainerCssClassName, errorDivContainerCssClassName,
                                                                  isFirstLineHoldingTitle, isLastLineHoldingCreationDate,
                                                                  titleCssClassName, creationDateCssClassName 
                                                                 ) {
            var temporaryContainer = $("<div />");
            var spaces = "<br />    ";

            $(temporaryContainer).load(relativePathToExternalDataSource,
                                    doInternalConversionInternal(parentContainerCssClass,
                                                                 dataDivContainerCssClassName, dataDivLineDefinitionContainerCssClassName, errorDivContainerCssClassName,
                                                                 isFirstLineHoldingTitle, isLastLineHoldingCreationDate,
                                                                 titleCssClassName, creationDateCssClassName
                                                                )
                                );
    }   

    function doInternalConversionInternal(parentContainerCssClass,
                                          dataDivContainerCssClassName, dataDivLineDefinitionContainerCssClassName, errorDivContainerCssClassName,
                                          isFirstLineHoldingTitle, isLastLineHoldingCreationDate,
                                          titleCssClassName, creationDateCssClassName
                                         ) {

            return function(responseTxt, textStatus, jqXHR) {
                    if(textStatus == "success") {
                        var emptyString = "";
                        var dataObjectArray = responseTxt.split("},");
                        var dataObjectArrayLength = dataObjectArray.length;

                        for (i = 0; i < dataObjectArrayLength; i++) {
                            var dataEntryArray = dataObjectArray[i].replace("{", emptyString).replace("}", emptyString).split("\n");
                            dataEntryArray = removeEmptyArrayItemsInternal(dataEntryArray);
                            var dataEntryArrayLength = dataEntryArray.length;
                            
                            var dynamicDiv = $("<div class=\"" + dataDivContainerCssClassName + "\" />");

                            for (j = 0; j < dataEntryArrayLength; j++) {
                                if(j == 0 && isFirstLineHoldingTitle) {
                                    var lineDefinitionDiv = $("<div class=\"" + titleCssClassName + "\" />");                                              
                                    $(lineDefinitionDiv).prop("innerHTML", dataEntryArray[j]);
                                    
                                    $(dynamicDiv).append(lineDefinitionDiv);
                                }
                                else if((j == dataEntryArrayLength - 1) && isLastLineHoldingCreationDate) {
                                    var lineDefinitionDiv = $("<div class=\"" + creationDateCssClassName + "\" />");                                              
                                    $(lineDefinitionDiv).prop("innerHTML", dataEntryArray[j]);
                                    
                                    $(dynamicDiv).append(lineDefinitionDiv);
                                }
                                else {
                                    var lineDefinitionDiv = $("<div class=\"" + dataDivLineDefinitionContainerCssClassName + "\" />");                                              
                                    $(lineDefinitionDiv).prop("innerHTML", dataEntryArray[j]);

                                    $(dynamicDiv).append(lineDefinitionDiv);
                                }
                            }
                            $(parentContainerCssClass).append(dynamicDiv);
                        }
                    }
                    else if (textStatus == "error") {
                        var dynamicDiv = $("<div class=\"" + errorDivContainerCssClassName + "\" />");                                              
                        $(dynamicDiv).prop("innerHTML", "Error while loading data, i.e.:<br />Status: " + jqXHR.status + "<br />Error description: " + jqXHR.statusText);
                        $(parentContainerCssClass).append(dynamicDiv);
                    }                    
                };

    }

    function removeEmptyArrayItemsInternal(inputArray) {
            var outputArray = [];

            var outputArrayIndex = -1;
            for (indexStart = 0; indexStart < inputArray.length; indexStart++) {
                if(validateAgainstNonPrintableCharsInternal(inputArray[indexStart])) {
                outputArray.push(null);
                outputArrayIndex += 1;
                outputArray[outputArrayIndex] = inputArray[indexStart];
                }
            }

            return outputArray;
    }

    function validateAgainstNonPrintableCharsInternal(inputString) {
        if(inputString.length == 0)
         return false;
        if(inputString.length == 1 && (inputString.charCodeAt(0) == 13 || inputString.charCodeAt(0) == 10))
         return false;
        
        return true;
    } 
    /* fills n child contaainers with external data */


    /* returns module prefix, i.e. myBooksInfo.js  -> myBooks; mainWebSiteModuleInfo.js ->  mainWebSiteModule etc. */
    function getModulePrefixInternal() { 
        var scripts = document.getElementsByTagName('script');

        var moduleFullPath = scripts[scripts.length - 1].src;
        var lastSlashPosition = moduleFullPath.lastIndexOf("/") + 1;
        var moduleName = moduleFullPath.substr(lastSlashPosition); 
        var modulePrefix = moduleName.replace("Info.js", "");

        return modulePrefix;
    }

    function getMonthNameInternal(monthNumber) {
        monthNumber += 1;
        if(monthNumber === 1) return "january";
        if(monthNumber === 2) return "february";
        if(monthNumber === 3) return "march";
        if(monthNumber === 4) return "april";
        if(monthNumber === 5) return "may";
        if(monthNumber === 6) return "june";
        if(monthNumber === 7) return "july";
        if(monthNumber === 8) return "august";
        if(monthNumber === 9) return "september";
        if(monthNumber === 10) return "october";
        if(monthNumber === 11) return "november";
        if(monthNumber === 12) return "december";
        return "n/a"
    }

    function getCurrentDateFormattedInternal_2(dateToBeFormatted) {
        return dateToBeFormatted.getDate() + "-" + getMonthNameInternal(dateToBeFormatted.getMonth())  + "-" + dateToBeFormatted.getFullYear(); 
    }

    //Public API
    Array.prototype.sliceOff = function (arrayOfIndicesToRemoveItemsFromInputArray, applyToObject, optionalArrayOfObjectProps) {
        return sliceOffInternal(this, arrayOfIndicesToRemoveItemsFromInputArray, applyToObject, optionalArrayOfObjectProps);
    }

    Array.prototype.insert = function (newArray, startIndex) {
        return insertInternal(this, newArray, startIndex);
    };

    String.prototype.reverse = function () {
        return reverseInternal(this);
    }

    String.prototype.countNumberOfChars = function (character) {
        return countNumberOfCharsInternal(this, character);
    }

    self.calculateDateDifference = function (startDate, endDate) {
        return calculateDateDifferenceInternal(startDate, endDate);
    }
	
    self.getCurrentDateFormatted = function(date) {
        return getCurrentDateFormattedInternal(date);
    }
	
    self.getCurrentDateFormatted_2 = function(date) {
        return getCurrentDateFormattedInternal_2(date);
    }

	self.calculateNumberOfDaysForCurrentMonth = function(currentMonth, currentYear) {
		return 	calculateNumberOfDaysForCurrentMonthInternal(currentMonth, currentYear);
	}
	
	self.calculateCountdownTime = function(deadlineDate, yearMark, monthMark, dayMark, hourMark, minuteMark, secondMark) {
		return calculateCountdownTimeInternal(deadlineDate, yearMark, monthMark, dayMark, hourMark, minuteMark, secondMark);
	}
	
    self.redirectToMobileVersionIfMobileBrowserDetected = function(mLetterPlusHyphenOrDot) {
       if (activeBrowser.browserUtility.isMobile) {
            activeBrowser.browserUtility.redirectToMobileVersion(mLetterPlusHyphenOrDot);
       }        
    }

    self.fillChildContainersUnderGivenParentContainer = function(relativePathToExternalDataSource,
                                                                 parentContainerCssClass, dataDivContainerCssClassName, dataDivLineDefinitionContainerCssClassName, errorDivContainerCssClassName,
                                                                 isFirstLineHoldingTitle, isLastLineHoldingCreationDate,
                                                                 titleCssClassName, creationDateCssClassName 
                                                                ) {
        return fillChildContainersUnderGivenParentContainerInternal(relativePathToExternalDataSource,
                                                                    parentContainerCssClass, dataDivContainerCssClassName, dataDivLineDefinitionContainerCssClassName, errorDivContainerCssClassName,
                                                                    isFirstLineHoldingTitle, isLastLineHoldingCreationDate,
                                                                    titleCssClassName, creationDateCssClassName                                                                     
                                                                   );
    }

    self.getModulePrefix = function() {
        return getModulePrefixInternal();
    }

    window.jsUtilities = window.jsUtilities || self;
})(window)
