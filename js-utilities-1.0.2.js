/*!
 * JsUtilities JavaScript library v1.0.2
 * (c) Dabrowski-Software-Development (https://github.com/dabrowski-software-development/JsUtilityFunctions)
 * License: MIT (http://www.opensource.org/licenses/mit-license.php)
 */

(function (window) {

    var self = this;

    /* private variables */

    var _tokenName = "___url_token___";
    var _shadowTokenName = "___url_token_shadow___";
    var _shadowToken;


    var _writeOperation = "___SMDUwVW01T1NsSldXWGhaTWp___PU2xKRlJqTlVNb___VW01T1NsSldXWGhaTWpBMVpERndXRkp1VmtwU2F6UjRXV3hqZUdKSFRuQlJiRlpvVm5wR2MxTXhSVGxRVVQw";
    var _readOperation = "___RXdiRVpqUkVacFVUQk___S1YyRXdiRVpqUkVacFVUQkdORlF4VGtKbFZURkZVbFJPU2xKRlJqTlVNbkJTWlVVN___lVNbkJTWlVVNWNWRlVRa3BTVjFKUFZtdE9lbVF3TVhGUldHUktVVEpvUlZkc1l6Rk5SMDUwVW01T1NsSldXWGhaTWpBMVpERndXRkp1VmtwU2F6UjRXV3hqZUdKSFRuQlJiRlpvVm5wR2MxTXhSVGxRVVQwOQ=SldXWGhaTWp=";
    var _defaultOperation;
    var _defaultOperationName = "___default_operation___";

    var _fallbackUrlName = "___fallbackUrl___";

    /* ~ private variables */


    /* private methods */

	function calculateNumberOfDaysForCurrentMonth_Internal(currentMonth, currentYear) {
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
	
	function calculateCountdownTime_Internal(deadlineDate, yearMark, monthMark, dayMark, hourMark, minuteMark, secondMark) {
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
		   if(days==calculateNumberOfDaysForCurrentMonth_Internal(currentDate.getMonth(), currentDate.getFullYear())) {
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
	
    function calculateDateDifference_Internal(startDate, endDate) {
        var sDate = startDate;
        var currentDate = endDate == undefined ? getCurrentDate_Internal() : endDate;
				
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

    function getCurrentDate_Internal() {
        return new Date();
    }

    function getCurrentDateFormatted_Internal(date) {
        var day = date.getDate();
        var month = date.getMonth();
        var year = date.getFullYear();

        return year + "-" + month + "-" + day;
    }


    /*sliceOff details */
    function sliceOff_Internal(inputArray, arrayOfIndicesToRemoveItemsFromInputArray, applyToObject, optionalArrayOfObjectProps) {
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

            resultArray = removeFilteredItemsFromArray_Internal(clone, properties, propertiesValues);
        }
        else {
            if (arrayOfIndicesToRemoveItemsFromInputArray.length > 0) {
                var isOrderPreserved = checkIfOrderIsPreserved_Internal(arrayOfIndicesToRemoveItemsFromInputArray);
                resultArray = removeItemsFromArray_Internal(clone, arrayOfIndicesToRemoveItemsFromInputArray, isOrderPreserved);
            }
        }

        return resultArray;
    }

    function checkIfOrderIsPreserved_Internal(arrayOfIndicesToRemoveItemsFromInputArray) {
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

    function removeFilteredItemsFromArray_Internal(inputArray, properties, propertiesValues) {

        for (var i = 0; i < inputArray.length; i++) {
            var obj = inputArray[i];
            var toBeRemoved =  ifQualifiesToDeletion_Internal(obj, properties, propertiesValues);
            if (toBeRemoved)
                inputArray = removeObject_Internal(inputArray, obj);
        }

        return inputArray;
    }

    function removeItemsFromArray_Internal(inputArray, arrayOfIndicesToRemoveItemsFromInputArray, isOrderPreserved) {
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

            resultArray = convertArrayOfArraysToOneDimensionalArrayOfUniqueItems_Internal(inputArrayClones, removedItems);
        }

        return resultArray;
    }

    function convertArrayOfArraysToOneDimensionalArrayOfUniqueItems_Internal(arrayOfArrays, removedItems) {
        var result = [];

        for (var i = 0, m_length = arrayOfArrays.length; i < m_length; i++) {
            arrayOfArrays[i].map(function (item) {
                removedItems.indexOf(item) === -1 && result.indexOf(item) === -1 ? result.push(item) : "";
            });
        }

        return result;
    }

    function  ifQualifiesToDeletion_Internal(obj, properties, propertiesValues) {
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

    function removeObject_Internal(inputArray, obj) {
        var indexOf = inputArray.indexOf(obj);
        inputArray.splice(indexOf, 1);
        return inputArray;
    }
    /*sliceOff details */


    /*insert_Internal details*/
    function insert_Internal(originalArray, newArray, startIndex) {

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
    /*insert_Internal details*/


    /*reverse_Internal details*/
    function reverse_Internal(input) {
        var result = "";

        for (var i = input.length - 1; i >= 0; i--) {
            result += input[i];
        }

        return result;
    }
    /*reverse_Internal details*/

    /*countNumberOfChars_Internal details*/
    function countNumberOfChars_Internal(inputString, character) {
        var result = 0;

        for (var i = 0, isLength = inputString.length; i < isLength; i++) {
            if (inputString[i] === character)
                result += 1;
        }

        return result;
    }
    /*countNumberOfChars_Internal details*/


    /* fills n child contaainers with external data */
    function fillChildContainersUnderGivenParentContainer_Internal(relativePathToExternalDataSource,
                                                                  parentContainerCssClass,
                                                                  dataDivContainerCssClassName, dataDivLineDefinitionContainerCssClassName, errorDivContainerCssClassName,
                                                                  isFirstLineHoldingTitle, isLastLineHoldingCreationDate,
                                                                  titleCssClassName, creationDateCssClassName 
                                                                 ) {
            var temporaryContainer = $("<div />");
            var spaces = "<br />    ";

            $(temporaryContainer).load(relativePathToExternalDataSource,
                                    doInternalConversion_Internal(parentContainerCssClass,
                                                                 dataDivContainerCssClassName, dataDivLineDefinitionContainerCssClassName, errorDivContainerCssClassName,
                                                                 isFirstLineHoldingTitle, isLastLineHoldingCreationDate,
                                                                 titleCssClassName, creationDateCssClassName
                                                                )
                                );
    }   

    function doInternalConversion_Internal(parentContainerCssClass,
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
                            dataEntryArray = removeEmptyArrayItems_Internal(dataEntryArray);
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

    function doInternalConversion_2_Internal(
                                            storageData,
                                            parentContainerCssClass,
                                            dataDivContainerCssClassName, dataDivLineDefinitionContainerCssClassName, errorDivContainerCssClassName,
                                            isFirstLineHoldingTitle, isLastLineHoldingCreationDate,
                                            titleCssClassName, creationDateCssClassName) {
                        var emptyString = "";
                        var dataObjectArray = storageData.split("},");
                        var dataObjectArrayLength = dataObjectArray.length;

                        for (i = 0; i < dataObjectArrayLength; i++) {
                            var dataEntryArray = dataObjectArray[i].replace("{", emptyString).replace("}", emptyString).split("\n");
                            dataEntryArray = removeEmptyArrayItems_Internal(dataEntryArray);
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

    function removeEmptyArrayItems_Internal(inputArray) {
            var outputArray = [];

            var outputArrayIndex = -1;
            for (indexStart = 0; indexStart < inputArray.length; indexStart++) {
                if(validateAgainstNonPrintableChars_Internal(inputArray[indexStart])) {
                outputArray.push(null);
                outputArrayIndex += 1;
                outputArray[outputArrayIndex] = inputArray[indexStart];
                }
            }

            return outputArray;
    }

    function validateAgainstNonPrintableChars_Internal(inputString) {
        if(inputString.length == 0)
         return false;
        if(inputString.length == 1 && (inputString.charCodeAt(0) == 13 || inputString.charCodeAt(0) == 10))
         return false;
        
        return true;
    } 
    /* fills n child contaainers with external data */


    /* returns module prefix, i.e. myBooksInfo.js  -> myBooks; mainWebSiteModuleInfo.js ->  mainWebSiteModule etc. */
    function getModulePrefix_Internal() { 
        var scripts = document.getElementsByTagName('script');

        var moduleFullPath = scripts[scripts.length - 1].src;
        var lastSlashPosition = moduleFullPath.lastIndexOf("/") + 1;
        var moduleName = moduleFullPath.substr(lastSlashPosition); 
        var modulePrefix = moduleName.replace("Info.js", "");

        return modulePrefix;
    }

    function getMonthName_Internal(monthNumber) {
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

    function getCurrentDateFormatted_Internal_2(dateToBeFormatted) {
        return dateToBeFormatted.getDate() + "-" + getMonthName_Internal(dateToBeFormatted.getMonth())  + "-" + dateToBeFormatted.getFullYear(); 
    }

    function redirectBasedOn_ClientIPvsServerIP_IsMatch_Internal(server_IP_Adress, destinationAbsoluteUrl, isMatch) {
	  var baseURL = '//jsonip.com/?callback=?';

      $.getJSON(
                baseURL,
                function(responseData) {
                  if (isMatch == true) {
                    if(responseData.ip == server_IP_Adress) {
                        location.href = destinationAbsoluteUrl;
                    }
                  }
                  else {
                    if(responseData.ip != server_IP_Adress) {
                        location.href = destinationAbsoluteUrl;
                    }                      
                  }
                }
      );
    }

    function createXmlHttpRequest(itemNameForLaterAccess, callback, doCache) {
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function() {
                                      if(xhr.status == 200 && xhr.readyState == 4) {
                                          if(doCache) {
                                            sessionStorage.setItem(itemNameForLaterAccess, xhr.responseText);
                                            callback();
                                          }
                                          else {
                                              callback(xhr.responseText);
                                          }
                                      }
                                 };

        return xhr;
    }

    function loadDynamicallyModuleFromDisk_Internal(nameOfModuleToAccces, modulePath, callback) {
        if (typeof(Storage) !== "undefined") {

            var xhr = createXmlHttpRequest(nameOfModuleToAccces, callback, true);

            xhr.open("GET", modulePath, true);
            xhr.send(null);
        }
    }

    function loadDynamicallyContent_Internal(itemPath, callback) {
        if (typeof(Storage) !== "undefined") {
            var xhr = createXmlHttpRequest("", callback, false);

            xhr.open("GET", itemPath, true);
            xhr.send(null);
        }
    }

    function exposeToCurrentWindowDynamicallyLoadedModuleFromDisk_Internal(nameOfModuleToAccces) {
        var dynamicModuleScript = sessionStorage.getItem(nameOfModuleToAccces);
        
        eval(dynamicModuleScript);
    }

    function isCurrentOperationSetToWrite_Internal() {
        var result;

        // get current operation
        _defaultOperation = sessionStorage.getItem(_defaultOperationName);
        
        if(_defaultOperation == null) {
            sessionStorage.setItem(_defaultOperationName, _writeOperation);
            result = true;
        }
        else {
            result = _defaultOperation === _writeOperation;
        }

        // return current operation writable status
        return result;
    }

    function determineNextOperationWritableStatus_Internal() {
        _defaultOperation = sessionStorage.getItem(_defaultOperationName);
        switch (_defaultOperation) {
            case _writeOperation:
                 sessionStorage.setItem(_defaultOperationName, _readOperation);
                break;
            
            case _readOperation:
                 sessionStorage.setItem(_defaultOperationName, _writeOperation);
                break;
        }
    }

    function createDestinationUrlToken_Internal() {
        var token = btoa(btoa(
                                (Math.random().toString(36) + Math.random().toString(36) + Math.random().toString(36) +
                                 Math.random().toString(36) + Math.random().toString(36) + Math.random().toString(36)
                                ).substring(3) +
                                btoa(new Date())
                             )
                        );

        return token;
    }    

    function getDestinationUrlShadowToken_Internal() {
        return _shadowToken;
    }    

    function setDestinationUrlNewShadowToken_Internal() {
        _shadowToken = createDestinationUrlToken_Internal();
        sessionStorage.setItem(_shadowTokenName, _shadowToken);
    }    

    function getDestinationUrlToken_Internal() {
        var tokenShadow = getDestinationUrlShadowToken_Internal();
        var token = setDestinationUrlToken_Internal(tokenShadow);

        return token;
    }

    function setDestinationUrlToken_Internal(token) {

        var encoded_token = btoa(btoa(token));

        sessionStorage.setItem(_tokenName, encoded_token);

        return "#" + encoded_token;
    }

    function checkDestinationUrlToken_and_AllowForGeneratingNewIfValidationFailed_Internal(callback) {
        var url_token = atob(atob(sessionStorage.getItem(_tokenName) || ""));
        var url_token_shadow = sessionStorage.getItem(_shadowTokenName);

        var url_href_token = atob(atob(window.location.hash.substring(1) || ""));

        if(
            url_token === url_token_shadow &&
            url_token === url_href_token &&
            url_href_token === url_token_shadow
        ) {
            // delete current used token
            sessionStorage.removeItem(_tokenName);
            sessionStorage.removeItem(_shadowTokenName);

            // notify that validation passed
            callback(true);
        }
        else {
            // delete current used token
            sessionStorage.removeItem(_tokenName);
            sessionStorage.removeItem(_shadowTokenName);

            // token validation failed, therefore switch to write mode for destination url to be able to generate a new token
            determineNextOperationWritableStatus_Internal();

            // reverts to the calling url
            window.location.href = getFallbackUrl_Internal();
            
            // notify that validation failed
            callback(false);
        }
    }

    function getFallbackUrl_Internal() {
        return sessionStorage.getItem(_fallbackUrlName);
    }

    function setFallbackUrl_Internal(fallbackUrl) {
        sessionStorage.setItem(_fallbackUrlName, fallbackUrl);
    }

    function clearHash_Internal(hashReplacement) {
        window.location.hash = hashReplacement;
    }

    function randomizeArray_Internal(inputArray) {
		inputArray.sort(function() { return 0.7 - Math.random() });
		
		return inputArray;
	 }

    /* ~ private methods */



    /* Public API */

    Array.prototype.sliceOff = function (arrayOfIndicesToRemoveItemsFromInputArray, applyToObject, optionalArrayOfObjectProps) {
        return sliceOff_Internal(this, arrayOfIndicesToRemoveItemsFromInputArray, applyToObject, optionalArrayOfObjectProps);
    }

    Array.prototype.insert = function (newArray, startIndex) {
        return insert_Internal(this, newArray, startIndex);
    };

    String.prototype.reverse = function () {
        return reverse_Internal(this);
    }

    String.prototype.countNumberOfChars = function (character) {
        return countNumberOfChars_Internal(this, character);
    }

    self.calculateDateDifference = function (startDate, endDate) {
        return calculateDateDifference_Internal(startDate, endDate);
    }
	
    self.getCurrentDateFormatted = function(date) {
        return getCurrentDateFormatted_Internal(date);
    }
	
    self.getCurrentDateFormatted_2 = function(date) {
        return getCurrentDateFormatted_Internal_2(date);
    }

	self.calculateNumberOfDaysForCurrentMonth = function(currentMonth, currentYear) {
		return 	calculateNumberOfDaysForCurrentMonth_Internal(currentMonth, currentYear);
	}
	
	self.calculateCountdownTime = function(deadlineDate, yearMark, monthMark, dayMark, hourMark, minuteMark, secondMark) {
		return calculateCountdownTime_Internal(deadlineDate, yearMark, monthMark, dayMark, hourMark, minuteMark, secondMark);
	}
	
    self.redirectToMobileVersionIfMobileBrowserDetected = function(mLetterPlusHyphenOrDot) {
       if (activeBrowser.browserUtility.isMobile) {
            activeBrowser.browserUtility.redirectToMobileVersion(mLetterPlusHyphenOrDot);
       }        
    }

    self.redirectToDesktopVersionIfDesktopBrowserDetected = function() {
        if (!activeBrowser.browserUtility.isMobile) {
            activeBrowser.browserUtility.redirectToDesktopVersion();
        }
    }

    self.fillChildContainersUnderGivenParentContainer = function(relativePathToExternalDataSource,
                                                                 parentContainerCssClass, dataDivContainerCssClassName, dataDivLineDefinitionContainerCssClassName, errorDivContainerCssClassName,
                                                                 isFirstLineHoldingTitle, isLastLineHoldingCreationDate,
                                                                 titleCssClassName, creationDateCssClassName 
                                                                ) {
        return fillChildContainersUnderGivenParentContainer_Internal(relativePathToExternalDataSource,
                                                                    parentContainerCssClass, dataDivContainerCssClassName, dataDivLineDefinitionContainerCssClassName, errorDivContainerCssClassName,
                                                                    isFirstLineHoldingTitle, isLastLineHoldingCreationDate,
                                                                    titleCssClassName, creationDateCssClassName                                                                     
                                                                   );
    }

    self.fillChildContainersUnderGivenParentContainer_2 = function(
                                                                    storageData,
                                                                    parentContainerCssClass,
                                                                    dataDivContainerCssClassName, dataDivLineDefinitionContainerCssClassName, errorDivContainerCssClassName,
                                                                    isFirstLineHoldingTitle, isLastLineHoldingCreationDate,
                                                                    titleCssClassName, creationDateCssClassName
                                                          ) {
        return doInternalConversion_2_Internal(
                                                storageData,
                                                parentContainerCssClass,
                                                dataDivContainerCssClassName, dataDivLineDefinitionContainerCssClassName, errorDivContainerCssClassName,
                                                isFirstLineHoldingTitle, isLastLineHoldingCreationDate,
                                                titleCssClassName, creationDateCssClassName
                                            );
    };

    self.getModulePrefix = function() {
        return getModulePrefix_Internal();
    }

    self.redirectBasedOn_ClientIPvsServerIP_IsMatch = function(server_IP_Adress, destinationAbsoluteUrl, isMatch) {
        redirectBasedOn_ClientIPvsServerIP_IsMatch_Internal(server_IP_Adress, destinationAbsoluteUrl, isMatch)        
    }
    
    self.loadDynamicallyModuleFromDisk = function(nameOfModuleToAccces, modulePath, callback) {
        return loadDynamicallyModuleFromDisk_Internal(nameOfModuleToAccces, modulePath, callback);
    }

    self.loadDynamicallyContent = function(itemPath, callback) {
        return loadDynamicallyContent_Internal(itemPath, callback);
    }

    self.exposeToCurrentWindowDynamicallyLoadedModuleFromDisk = function(nameOfModuleToAccces) {
        return exposeToCurrentWindowDynamicallyLoadedModuleFromDisk_Internal(nameOfModuleToAccces);
    }

    self.isCurrentOperationSetToWrite = function() {
        return isCurrentOperationSetToWrite_Internal();
    }

    self.determineNextOperationWritableStatus = function() {
        return determineNextOperationWritableStatus_Internal();
    }

    self.setDestinationUrlNewShadowToken = function() {
        return setDestinationUrlNewShadowToken_Internal();
    }    

    self.getDestinationUrlToken = function() {
        return getDestinationUrlToken_Internal();
    }

    self.checkDestinationUrlToken_and_AllowForGeneratingNewIfValidationFailed = function(callback) {
        return checkDestinationUrlToken_and_AllowForGeneratingNewIfValidationFailed_Internal(callback);
    }

    self.getFallbackUrl = function() {
        return getFallbackUrl_Internal();
    }

    self.setFallbackUrl = function(fallbackUrl) {
        return setFallbackUrl_Internal(fallbackUrl);
    }

    self.clearHash = function(hashReplacement) {
        return clearHash_Internal(hashReplacement);
    }

    self.randomizeArray = function(inputArray) {
        return randomizeArray_Internal(inputArray);
    }

    /* ~ Public API */


    /* Expose module API to the outside world */
    window.jsUtilities = window.jsUtilities || self;
})(window)
