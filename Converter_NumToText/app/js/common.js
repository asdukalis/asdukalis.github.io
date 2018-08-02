	$(document).ready(function() {
    // СТАРТ
// /////////////////////////variabels
    var TEN = 10;
    var ONE_HUNDRED = 100;
    var ONE_THOUSAND = 1000;
    var ONE_MILLION = 1000000;
    var ONE_BILLION = 1000000000;
    var ONE_TRILLION = 1000000000000;
    var ONE_QUADRILLION = 1000000000000000;

    var numerals = {
      ukr:{
        THOUS: [" тисяч ", " тисячa ", " тисячi "],
        MILL: [" мільйонів ", " мільйон ", " мільйона "],
        BILL: [" мільярдів ", " мільярд ", " мільярда "],
        TRILL: [" трильйонів ", " трильйон ", " трильйона "],
        EXEPT: ["нуль", "одна", "двi"],
        LESS_THAN_TWENTY: ["нуль", "один", "два", "три", "чотири", "п'ять", "шість", "сім", "вісім", "дев'ять", "десять", "одинадцять", "дванадцять", "тринадцять", "чотирнадцять", "п'ятнадцять", "шістнадцять", "сімнадцять", "вісімнадцять", "дев'ятнадцять"],
        TENTHS_LESS_THAN_HUNDRED: ["", "десять", "двадцять", "тридцять", "сорок", "п'ятдесят", "шістдесят", "сімдесят", "вісімдесят", "дев'яносто"],
        TENTHS_LESS_THAN_THOUSAND: ["", "сто", "двісті", "триста", "чотириста", "п'ятсот", "шістсот", "сімсот", "вісімсот", "дев'ятьсот"]
      },
      eng:{
        LESS_THAN_TWENTY: ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"],
        TENTHS_LESS_THAN_HUNDRED: ["zero", "ten", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"],
        BIGEST_NUM: [" hundred", " thousand ", " million ", " billion ", " trillion "]
      },
      det:{
        EXEPT: ["null", "ein", "eine"],
        LESS_THAN_TWENTY: ["null", "eins", "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "neun", "zehn", "elf", "zwölf", "dreizehn", "vierzehn", "fünfzehn", "sechzehn", "siebzehn", "achtzehn", "neunzehn"],
        TENTHS_LESS_THAN_HUNDRED: ["null", "zehn", "zwanzig", "dreißig", "vierzig", "fünfzig", "sechzig", "siebzig", "achtzig", "neunzig"],
        BIGEST_NUM: [ "hundert", "tausend", " Million ", " Milliarden ", " Billionen "]
      }
    };

    var VAR_FOR_CHANGING = {
      ukr: {
        ENDS_WITH_TEEN_PATTERN: /надцять$/,
        ENDS_WITH_Y_PATTERN: /сят$/,
        ENDS_WITH_ZERO_THROUGH_TWELVE_PATTERN: /(нуль|одна|двi|три|чотири|п'ять|шість|сім|вісім|дев'ять|десять|сорок|двадцять|тридцять|девяносто|сто|тысяча|мільйон|мільярд|трильйон)$/,
        ordinalLess: { "одна": "перший", "двi": "другий", "нуль": "нульовий", "один": "перший", "два": "другий", "три": "третій", "чотири": "четвертий", "п'ять": "п'ятьтий", "шість": "шостий", "сім": "сьомий", "вісім": "восьмий", "дев'ять": "дев'ятий", "десять": "десятий", "двадцять": "двадцятий", "тридцять": "тридцятий", "сорок": "сороковий", "дев'яносто": "дев'яностий", "сто": "сотий", "тысяча": "тысячний", "мільйон": "мiльйoний", "мільярд": "мільярдний", "трильйон": "трильйонний"},
      },
      eng: {
        ENDS_WITH_DOUBLE_ZERO_PATTERN: /(hundred|thousand|(m|b|tr|quadr)illion)$/,
        ENDS_WITH_TEEN_PATTERN: /teen$/,
        ENDS_WITH_Y_PATTERN: /y$/,
        ENDS_WITH_ZERO_THROUGH_TWELVE_PATTERN: /(zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)$/,
        ordinalLess: { "zero": "zeroth", "one": "first", "two": "second", "three": "third", "four": "fourth", "five": "fifth", "six": "sixth", "seven": "seventh", "eight": "eighth", "nine": "ninth", "ten": "tenth", "eleven": "eleventh", "twelve": "twelfth" },

      },
      det: {
        ENDS_WITH_TEEN_PATTERN: /(null|zwei|vier|fünf|sechs|neun|zehn|elf|zwölf|dreizehn|vierzehn|fünfzehn|sechzehn|siebzehn|achtzehn|neunzehn)$/,
        ENDS_WITH_ZERO_THROUGH_TWELVE_PATTERN: /(eins|drei|sieben|acht)$/,
        ordinalLess: { "eins": "erste", "drei": "dritte", "sieben": "siebte", "acht": "achte" }
      }
    }

    
      $("input[type='radio']").on("click", function() {
        $(".btn").on("click", function(event) {
          var get_num = $(".get_num").val();

          // Checks

          // NAN
          if (isNaN(get_num)) {
            $(document).find(".num_converted").html("Не числовое значение");
            return;
          }
          // whole number
          if (get_num.indexOf(".") != -1) {
            $(document).find(".num_converted").html("Введите целое число");
            return;
          } else {
            int = get_num;
          }
          // too large the number
          if (int.length > 15) {
            $(document).find(".num_converted").html("Слишком большое число");
            return;
          }
          if (get_num) {
            //will convert numbers into words:
            var num_to_words = toWordsOrdinal(get_num);
            $(document).find(".num_converted").html(num_to_words);
          }
        });

        //  Converts an integer into words.
          //  If number is decimal, the decimals will be removed.
        function toWords(number, asOrdinal) {
          var words;
          var num = parseInt(number, 10);
          // var IndexNum = 1000;
          // console.log(IndexNum);
          words = generateWords(num);
          return asOrdinal ? makeOrdinal(words) : words;
        }

        if ($("#first").is(":checked")) {
          
          // Преобразует числовое слово в порядковое числовое слово

          function makeOrdinal(words) {
            // Ends with *00 (100, 1000, etc.) or *teen (13, 14, 15, 16, 17, 18, 19)
            if (VAR_FOR_CHANGING.ukr.ENDS_WITH_TEEN_PATTERN.test(words)) {
              return words.replace(VAR_FOR_CHANGING.ukr.ENDS_WITH_TEEN_PATTERN, "надцятий");
            }
            // Ends with (50, 60, 70, 80)
            else if (VAR_FOR_CHANGING.ukr.ENDS_WITH_Y_PATTERN.test(words)) {
              return words.replace(VAR_FOR_CHANGING.ukr.ENDS_WITH_Y_PATTERN, "сятий");
            }
            // Ends with 1 through 10
            else if (VAR_FOR_CHANGING.ukr.ENDS_WITH_ZERO_THROUGH_TWELVE_PATTERN.test(words)) {
              return words.replace(VAR_FOR_CHANGING.ukr.ENDS_WITH_ZERO_THROUGH_TWELVE_PATTERN, replaceWithOrdinalVariant);
            }
            return words;
          }

          function replaceWithOrdinalVariant(match, numberWord) {
            return VAR_FOR_CHANGING.ukr.ordinalLess[numberWord];
          }

            function generateWords(number) {
            var remainder, word, lastCharr, index
              words = arguments[1];

            var thousFunc = function (number){
              if (lastCharr > 20) {
                lastCharr = Math.floor(number / ONE_THOUSAND) % 10;
                word = (lastCharr > 4 || lastCharr == 0) ? word:                    
                  (lastCharr == 2 || lastCharr == 3 || lastCharr == 4) ? word:
                  (lastCharr == 2) ? numerals.ukr.EXEPT[lastCharr]:
                  (lastCharr == 1) ? word: "";
              }
              word = ((lastCharr > 4 && lastCharr <= 20) || lastCharr == 0) ? word + numerals.ukr.THOUS[0]:                      
                  (lastCharr == 2 || lastCharr == 3 || lastCharr == 4) ? word + numerals.ukr.THOUS[2]:
                  (lastCharr == 2) ? numerals.ukr.EXEPT[lastCharr]:
                  (lastCharr == 1) ? word + numerals.ukr.THOUS[lastCharr]: ""; 
                  return word;     
            }
            var millFunc = function (number){
              if (lastCharr > 20) {
                lastCharr = Math.floor(number / ONE_MILLION) % 10;
                word = (lastCharr > 4 || lastCharr == 0) ? word:                    
                  (lastCharr == 2 || lastCharr == 3 || lastCharr == 4) ? word:
                  (lastCharr == 2) ? word:
                  (lastCharr == 1) ? word: "";
              }
              word = ((lastCharr > 4 && lastCharr <= 20) || lastCharr == 0) ? word + numerals.ukr.MILL[0]:                      
                  (lastCharr == 2 || lastCharr == 3 || lastCharr == 4) ? word + numerals.ukr.MILL[2]:
                  (lastCharr == 2) ? word:
                  (lastCharr == 1) ? word + numerals.ukr.MILL[lastCharr]: ""; 
                  return word;
            }
            var billFunc = function (number){
              if (lastCharr > 20) {
                lastCharr = Math.floor(number / ONE_BILLION) % 10;
                word = (lastCharr > 4 || lastCharr == 0) ? word:                    
                  (lastCharr == 2 || lastCharr == 3 || lastCharr == 4) ? word:
                  (lastCharr == 2) ? word:
                  (lastCharr == 1) ? word: "";
              }
              word = ((lastCharr > 4 && lastCharr <= 20) || lastCharr == 0) ? word + numerals.ukr.BILL[0]:                      
                  (lastCharr == 2 || lastCharr == 3 || lastCharr == 4) ? word + numerals.ukr.BILL[2]:
                  (lastCharr == 2) ? word:
                  (lastCharr == 1) ? word + numerals.ukr.BILL[lastCharr]: ""; 
                  return word;
            }
            var trillFunc = function (number){
              if (lastCharr > 20) {
                lastCharr = Math.floor(number / ONE_TRILLION) % 10;
                word = (lastCharr > 4 || lastCharr == 0) ? word:                    
                  (lastCharr == 2 || lastCharr == 3 || lastCharr == 4) ? word:
                  (lastCharr == 2) ? word:
                  (lastCharr == 1) ? word: "";
              }
              word = ((lastCharr > 4 && lastCharr <= 20) || lastCharr == 0) ? word + numerals.ukr.TRILL[0]:                      
                  (lastCharr == 2 || lastCharr == 3 || lastCharr == 4) ? word + numerals.ukr.TRILL[2]:
                  (lastCharr == 2) ? word:
                  (lastCharr == 1) ? word + numerals.ukr.TRILL[lastCharr]: ""; 
                  return word;
            }

            // We’re done
            if (number === 0) {
              return !words ? numerals.ukr.LESS_THAN_TWENTY[0] : words.join(" ").replace(/,$/, "");
            }
            if (number >= ONE_THOUSAND && number < ONE_MILLION) {
            }

            if (!words) {
              // First run
              words = [];
            }
            // If negative, prepend “minus”
            if (number < 0) {
              words.push("мінус");
              number = Math.abs(number);
            }
            if (number < 20) { 
              remainder = 0;  
              word = (number == 2) ? numerals.ukr.EXEPT[number]:
                (number == 1) ? numerals.ukr.EXEPT[number]:
                numerals.ukr.LESS_THAN_TWENTY[number];
            }else if (number < ONE_HUNDRED) {
              remainder = number % TEN;
              word = numerals.ukr.TENTHS_LESS_THAN_HUNDRED[Math.floor(number / TEN)];
              word = (remainder == 2) ? word + " " + numerals.ukr.EXEPT[remainder]:
                (remainder == 1) ? word + " " + numerals.ukr.EXEPT[remainder]:
                word + " " + numerals.ukr.LESS_THAN_TWENTY[remainder];
              remainder = 0;
            } else if (number < ONE_THOUSAND) {
              remainder = number % ONE_HUNDRED;
              word = numerals.ukr.TENTHS_LESS_THAN_THOUSAND[Math.floor(number / ONE_HUNDRED)];
              if (word < ONE_HUNDRED) {
                reremainder = number % TEN;
                reword += " " + numerals.ukr.LESS_THAN_TWENTY[reremainder] + " " + numerals.ukr.TENTHS_LESS_THAN_THOUSAND[remainder];
                remainder = 0;
              }
            } 
            else if (number < ONE_MILLION) {
              remainder = number % ONE_THOUSAND;
              word = generateWords(Math.floor(number / ONE_THOUSAND));
              var numLength = Math.floor(number / ONE_THOUSAND).toString().length;
              
              if (numLength == 3) {
                lastCharr = Math.floor(number / ONE_THOUSAND) % 100;
                console.log(lastCharr);
                word = thousFunc(number, ONE_THOUSAND);                
              }else if (numLength <= 2) {
                lastCharr = Math.floor(number / ONE_THOUSAND);
                word = thousFunc(number, ONE_THOUSAND);  
              }
            } else if (number < ONE_BILLION) {
              remainder = number % ONE_MILLION;
              word = generateWords(Math.floor(number / ONE_MILLION));
              numLength = Math.floor(number / ONE_MILLION).toString().length;              
              
              if (numLength == 3) {
                lastCharr = Math.floor(number / ONE_MILLION) % 100;
                word = millFunc(number); 
              }else if (numLength <= 2) {
                lastCharr = Math.floor(number / ONE_MILLION);
               word = millFunc(number); 
              }
            } else if (number < ONE_TRILLION) {
              remainder = number % ONE_BILLION;
              word = generateWords(Math.floor(number / ONE_BILLION));
              numLength = Math.floor(number / ONE_BILLION).toString().length;
              if (numLength == 3) {
                lastCharr = Math.floor(number / ONE_BILLION) % 100;
                word = billFunc(number); 
              } else if (numLength <= 2) {
                lastCharr = Math.floor(number / ONE_BILLION);
                word = billFunc(number); 
              }
            } else if (number < ONE_QUADRILLION) {
              remainder = number % ONE_TRILLION;
              word = generateWords(Math.floor(number / ONE_TRILLION));
              numLength = Math.floor(number / ONE_TRILLION).toString().length;
              if (numLength == 3) {
                lastCharr = Math.floor(number / ONE_TRILLION) % 100;
                word = trillFunc(number); 
              } else if (numLength <= 2) {
                lastCharr = Math.floor(number / ONE_TRILLION);
                word = trillFunc(number); 
              }
            }

            words.push(word);
            return generateWords(remainder, words);
          }

 // ////////////////////////   English   ////////////////////////////////    
        } else if ($("#second").is(":checked")) {
          
          //  Converts a number-word into an ordinal number-word.

          function makeOrdinal(words) {
            // Ends with *00 (100, 1000, etc.) or *teen (13, 14, 15, 16, 17, 18, 19)
            if (VAR_FOR_CHANGING.eng.ENDS_WITH_DOUBLE_ZERO_PATTERN.test(words) || VAR_FOR_CHANGING.eng.ENDS_WITH_TEEN_PATTERN.test(words)) {
              return words + "th";
            }
            // Ends with *y (20, 30, 40, 50, 60, 70, 80, 90)
            else if (VAR_FOR_CHANGING.eng.ENDS_WITH_Y_PATTERN.test(words)) {
              return words.replace(VAR_FOR_CHANGING.eng.ENDS_WITH_Y_PATTERN, "ieth");
            }
            // Ends with one through twelve
            else if (VAR_FOR_CHANGING.eng.ENDS_WITH_ZERO_THROUGH_TWELVE_PATTERN.test(words)) {
              return words.replace(VAR_FOR_CHANGING.eng.ENDS_WITH_ZERO_THROUGH_TWELVE_PATTERN, replaceWithOrdinalVariant);
            }
            return words;
          }

          function replaceWithOrdinalVariant(match, numberWord) {
            return VAR_FOR_CHANGING.eng.ordinalLess[numberWord];
          }          

          function generateWords(number) {
            var remainder, word,
              words = arguments[1];

            // We’re done
            if (number === 0) {
              return !words ? numerals.eng.LESS_THAN_TWENTY[0] : words.join(" ").replace(/,$/, "");
            }
            // First run
            if (!words) {
              words = [];
            }
            // If negative, prepend “minus”
            if (number < 0) {
              words.push("minus");
              number = Math.abs(number);
            }

            if (number < 20) {
              remainder = 0;
              word = numerals.eng.LESS_THAN_TWENTY[number];
            } else if (number < ONE_HUNDRED) {
              remainder = number % TEN;
              word = numerals.eng.TENTHS_LESS_THAN_HUNDRED[Math.floor(number / TEN)];
              if (remainder) {
                word += "-" + numerals.eng.LESS_THAN_TWENTY[remainder];
                remainder = 0;
              }
            } else if (number < ONE_THOUSAND) {
              remainder = number % ONE_HUNDRED;
              word = generateWords(Math.floor(number / ONE_HUNDRED)) + numerals.eng.BIGEST_NUM[0];
            } else if (number < ONE_MILLION) {
              remainder = number % ONE_THOUSAND;
              word = generateWords(Math.floor(number / ONE_THOUSAND)) + numerals.eng.BIGEST_NUM[1];
            } else if (number < ONE_BILLION) {
              remainder = number % ONE_MILLION;
              word = generateWords(Math.floor(number / ONE_MILLION)) + numerals.eng.BIGEST_NUM[2];
            } else if (number < ONE_TRILLION) {
              remainder = number % ONE_BILLION;
              word = generateWords(Math.floor(number / ONE_BILLION)) + numerals.eng.BIGEST_NUM[3];
            } else if (number < ONE_QUADRILLION) {
              remainder = number % ONE_TRILLION;
              word = generateWords(Math.floor(number / ONE_TRILLION)) + numerals.eng.BIGEST_NUM[4];
            }

            words.push(word);
            return generateWords(remainder, words);
          }

// ////////////////////////   Deutsche   //////////////////////////////// 
        } else {
          
          //  Converts a number-word into an ordinal number-word.
          function makeOrdinal(words) {
            // exceptions 1, 3, 7, 8
            if (VAR_FOR_CHANGING.det.ENDS_WITH_ZERO_THROUGH_TWELVE_PATTERN.test(words)) {
              return words.replace(VAR_FOR_CHANGING.det.ENDS_WITH_ZERO_THROUGH_TWELVE_PATTERN, replaceWithOrdinalVariant);
            }
            // 2 ->  19
            else if (VAR_FOR_CHANGING.det.ENDS_WITH_TEEN_PATTERN.test(words)) {
              return words + "t";
              // all
            } else {
              return words + "st";
            }
            return words;
          }

          function replaceWithOrdinalVariant(match, numberWord) {
            return VAR_FOR_CHANGING.det.ordinalLess[numberWord];
          }

          function generateWords(number) {
            var remainder,
              word,
              words = arguments[1];
            // We’re done
            if (number === 0) {
              return !words ? numerals.det.LESS_THAN_TWENTY[0] : words.join(" ").replace(/,$/, "");
            }
            // First run
            if (!words) {
              words = [];
            }
            // If negative, prepend “minus”
            if (number < 0) {
              words.push("minus");
              number = Math.abs(number);
            }

            if (number < 20) {
              remainder = 0;
              word = numerals.det.LESS_THAN_TWENTY[number];
            } else if (number < ONE_HUNDRED) {
              remainder = number % TEN;
              word = numerals.det.TENTHS_LESS_THAN_HUNDRED[Math.floor(number / TEN)];
              word = (remainder == 1) ? numerals.det.EXEPT[remainder] + "und" + word:
              (remainder) ? numerals.det.LESS_THAN_TWENTY[remainder] + "und" + word: "";
              remainder = 0;
            } else if (number < ONE_THOUSAND) {
              remainder = number % ONE_HUNDRED;
              index = Math.floor(number / ONE_HUNDRED);
              word = (index == 1) ? numerals.det.EXEPT[index] + numerals.det.BIGEST_NUM[0] : generateWords(Math.floor(number / ONE_HUNDRED)) + numerals.det.BIGEST_NUM[0];
              index = 0;
            } else if (number < ONE_MILLION) {
              remainder = number % ONE_THOUSAND;
              index = Math.floor(number / ONE_THOUSAND);
              word = index == 1 ? numerals.det.EXEPT[index] + numerals.det.BIGEST_NUM[1] : generateWords(Math.floor(number / ONE_THOUSAND)) + numerals.det.BIGEST_NUM[1];
              index = 0;              
            } else if (number < ONE_BILLION) {
              remainder = number % ONE_MILLION;
              index = Math.floor(number / ONE_MILLION);
              word = index == 1 ? numerals.det.EXEPT[index] + numerals.det.BIGEST_NUM[2] : generateWords(Math.floor(number / ONE_MILLION)) + numerals.det.BIGEST_NUM[2];
              index = 0; 
            } else if (number < ONE_TRILLION) {
              remainder = number % ONE_BILLION;
              index = Math.floor(number / ONE_BILLION);
              word = index == 1 ? numerals.det.EXEPT[index] + numerals.det.BIGEST_NUM[3] : generateWords(Math.floor(number / ONE_BILLION)) + numerals.det.BIGEST_NUM[3];
              index = 0; 
            } else if (number < ONE_QUADRILLION) {
              remainder = number % ONE_TRILLION;
              index = Math.floor(number / ONE_TRILLION);
               word = index == 1 ? numerals.det.EXEPT[index] + numerals.det.BIGEST_NUM[4] : generateWords(Math.floor(number / ONE_BILLION)) + numerals.det.BIGEST_NUM[4];
               index = 0; 
            }
            words.push(word);
            return generateWords(remainder, words);
          }
    }
    function toWordsOrdinal(number) {
      var words = toWords(number);
      return makeOrdinal(words);
    }
	});
});