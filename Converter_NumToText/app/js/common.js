$(document).ready(function() {
  var TEN = 10;
  var ONE_HUNDRED = 100;
  var ONE_THOUSAND = 1000;
  var ONE_MILLION = 1000000;
  var ONE_BILLION = 1000000000;
  var ONE_TRILLION = 1000000000000;
  var ONE_QUADRILLION = 1000000000000000;

  var ukr = {
    NUM: {
      THOUS: [" тисяч ", " тисячa ", " тисячi ", " тисячi ", " тисячi "],
      MILL: [" мільйонів ", " мільйон ", " мільйона ", " мільйона ", " мільйона "],
      BILL: [" мільярдів ", " мільярд ", " мільярда ", " мільярда ", " мільярда "],
      TRILL: [" трильйонів ", " трильйон ", " трильйона ", " трильйона ", " трильйона "],
      EXEPT: ["нуль", "одна", "двi"],
      LESS_THAN_TWENTY: ["", "один", "два", "три", "чотири", "п'ять", "шість", "сім", "вісім", "дев'ять", "десять", "одинадцять", "дванадцять", "тринадцять", "чотирнадцять", "п'ятнадцять", "шістнадцять", "сімнадцять", "вісімнадцять", "дев'ятнадцять"],
      LESS_THAN_HUNDR: ["", "десять", "двадцять", "тридцять", "сорок", "п'ятдесят", "шістдесят", "сімдесят", "вісімдесят", "дев'яносто"],
      LESS_THAN_THOUS: [ "", "сто", "двісті", "триста", "чотириста", "п'ятсот", "шістсот", "сімсот", "вісімсот", "дев'ятьсот"]
    },
    VAR_CHANGING: {
      ENDS_TEEN: /надцять$/,
      ENDS_TEN: /сят$/,
      ENDS_SPECIAL: /(нуль|один|одна|двi|два|три|чотири|п'ять|шість|сім|вісім|дев'ять|десять|сорок|двадцять|тридцять|дев'яносто|сто|тысяча|мільйон|мільярд|трильйон)$/,
      ordinalLess: {"одна": "перший", "двi": "другий", "нуль": "нульовий", "один": "перший", "два": "другий", "три": "третій", "чотири": "четвертий", "п'ять": "п'ятьтий", "шість": "шостий", "сім": "сьомий", "вісім": "восьмий", "дев'ять": "дев'ятий", "десять": "десятий", "двадцять": "двадцятий", "тридцять": "тридцятий", "сорок": "сороковий", "дев'яносто": "дев'яностий", "сто": "сотий", "тысяча": "тысячний", "мільйон": "мiльйoний", "мільярд": "мільярдний", "трильйон": "трильйонний"}
    }
  };

  var eng = {
    NUM: {
      LESS_THAN_TWENTY: [ "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"],
      LESS_THAN_HUNDR: [ "zero", "ten", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"],
      BIGEST_NUM: [ " hundred", " thousand ", " million ", " billion ", " trillion "]
    },
    VAR_CHANGING: {
      ENDS_MANY_ZERO: /(hundred|thousand|(m|b|tr|quadr)illion)$/,
      ENDS_TEEN: /teen$/,
      ENDS_TEN: /y$/,
      ENDS_SPECIAL: /(zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)$/,
      ordinalLess: {"zero": "zeroth", "one": "first", "two": "second", "three": "third", "four": "fourth", "five": "fifth", "six": "sixth", "seven": "seventh", "eight": "eighth", "nine": "ninth", "ten": "tenth", "eleven": "eleventh", "twelve": "twelfth"}
    }
  };

  var det = {
    NUM: {
      EXEPT: ["null", "ein", "eine"],
      LESS_THAN_TWENTY: ["null", "eins", "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "neun", "zehn", "elf", "zwölf", "dreizehn", "vierzehn", "fünfzehn", "sechzehn", "siebzehn", "achtzehn", "neunzehn"],
      LESS_THAN_HUNDR: ["null", "zehn", "zwanzig", "dreißig", "vierzig", "fünfzig", "sechzig", "siebzig", "achtzig", "neunzig"],
      BIGEST_NUM: ["hundert", "tausend", " Million ", " Milliarden ", " Billionen "]
    },
    VAR_CHANGING: {
      ENDS_TEEN: /(null|zwei|vier|fünf|sechs|neun|zehn|elf|zwölf|dreizehn|vierzehn|fünfzehn|sechzehn|siebzehn|achtzehn|neunzehn)$/,
      ENDS_SPECIAL: /(eins|drei|sieben|acht)$/,
      ordinalLess: {"eins": "erste", "drei": "dritte", "sieben": "siebte", "acht": "achte"}
    }
  };

  $("input[type='radio']").on("click", function() {
    $(".btn").on("click", function(event) {
      var getNum = $(".get_num").val();

      // NAN
      if (isNaN(getNum)) {
        $(document).find(".num_converted").html("Не числовое значение");
        return;
      }
      // whole number
      if (getNum.indexOf(".") != -1) {
        $(document).find(".num_converted").html("Введите целое число");
        return;
      } else {
        var int = getNum;
      }
      // too large the number
      if (int.length > 15) {
        $(document).find(".num_converted").html("Слишком большое число");
        return;
      }
      if (getNum) {
        //will convert numbers into words:
        var num_to_words = toWordsOrdinal(getNum);
        $(document).find(".num_converted").html(num_to_words);
      }
    });

    //  Converts an integer into words.
    //  If number is decimal, the decimals will be removed.
    function toWords(number, asOrdinal) {
      var words;
      var num = parseInt(number, 10);
      words = generateWords(num);
      return asOrdinal ? makeOrdinal(words) : words;
    }
    // /////////////////////////////////////////////////////Украинский /////////////////////////////////////////////////////
    if ($("#first").is(":checked")) {

      // Преобразует числовое слово в порядковое числовое слово
      function makeOrdinal(words) {
        var UKR = ukr.VAR_CHANGING;
        // Ends with *00 (100, 1000, etc.) or *teen (13, 14, 15, 16, 17, 18, 19)
        if (UKR.ENDS_TEEN.test(words)) {
          return words.replace(UKR.ENDS_TEEN, "надцятий");
        }
        // Ends with (50, 60, 70, 80)
        else if (UKR.ENDS_TEN.test(words)) {
          return words.replace(UKR.ENDS_TEN, "сятий");
        }
        // Ends with 1 through 10
        else if (UKR.ENDS_SPECIAL.test(words)) {
          return words.replace(UKR.ENDS_SPECIAL, replaceFirstVariant);
        }
        return words;
      }

      function replaceFirstVariant(numberWord) {
        return ukr.VAR_CHANGING.ordinalLess[numberWord];
      }

      function generateWords(number) {
        var remainder,
          word,
          words = arguments[1],
          lastCharr;
        var Ukr = ukr.NUM;

        function bundlingNumbers(number, razryad, chislo) {
          remainder = number % razryad;
          word = generateWords(Math.floor(number / razryad));
          var numLength = Math.floor(number / razryad).toString().length;
          function testing() {
            if (lastCharr > 4 || lastCharr == 0) {
              word += chislo[0];
            } else if (lastCharr >= 1 && lastCharr <= 4) {
              word += chislo[lastCharr];
            }
            return word;
          }
          function bundling() {
            if (lastCharr > 20) {
              lastCharr = Math.floor(number / razryad) % 10;
              testing();
            }
            testing();
            return word;
          }

          if (numLength == 3) {
            lastCharr = Math.floor(number / razryad) % 100;
            bundling();
          } else if (numLength <= 2) {
            lastCharr = Math.floor(number / razryad);
            bundling();
          }
          return word;
        }

				ANDREY(number, Ukr.EXEPT, words);
				console.log(ANDREY());
				function ANDREY(number, MY_NULL, words, minus) {
						// We’re done
					if (number === 0) {
						return !words ? MY_NULL[0] : words .join(" ").replace(/,$/, "");
					}
					if (!words) {
						// First run
						words = [];
					}
					// If negative, prepend “minus”
					if (number < 0) {
						words.push(minus);
						number = Math.abs(number);
					}
					return words, number;
				}

        // // We’re done
        // if (number === 0) {
        //   return !words ? Ukr.EXEPT[0] : words.join(" ").replace(/,$/, "");
        // }
        // if (!words) {
        //   // First run
        //   words = [];
        // }
        // // If negative, prepend “minus”
        // if (number < 0) {
        //   words.push("мінус");
        //   number = Math.abs(number);
				// }

        if (number < 20) {
          remainder = 0;
          word = Ukr.LESS_THAN_TWENTY[number];
        } else if (number < ONE_HUNDRED) {
          remainder = number % TEN;
          word = Ukr.LESS_THAN_HUNDR[Math.floor(number / TEN)];
          if (remainder) {
            word += " " + Ukr.LESS_THAN_TWENTY[remainder];
            remainder = 0;
          }
        } else if (number < ONE_THOUSAND) {
          remainder = number % ONE_HUNDRED;
          word = Ukr.LESS_THAN_THOUS[Math.floor(number / ONE_HUNDRED)];
        } else if (number < ONE_MILLION) {
          word = bundlingNumbers(number, ONE_THOUSAND, Ukr.THOUS);
        } else if (number < ONE_BILLION) {
          word = bundlingNumbers(number, ONE_MILLION, Ukr.MILL);
        } else if (number < ONE_TRILLION) {
          word = bundlingNumbers(number, ONE_BILLION, Ukr.BILL);
        } else if (number < ONE_QUADRILLION) {
          word = bundlingNumbers(number, ONE_TRILLION, Ukr.TRILL);
        }

        words.push(word);
        return generateWords(remainder, words);
      }

      // ////////////////////////   English   ////////////////////////////////
    } else if ($("#second").is(":checked")) {

      //  Converts a number-word into an ordinal number-word.
      function makeOrdinal(words) {
        var ENG = eng.VAR_CHANGING;
        // Ends with *00 (100, 1000, etc.) or *teen (13, 14, 15, 16, 17, 18, 19)
        if (ENG.ENDS_MANY_ZERO.test(words) || ENG.ENDS_TEEN.test(words)) {
          return words + "th";
        }
        // Ends with *y (20, 30, 40, 50, 60, 70, 80, 90)
        else if (ENG.ENDS_TEN.test(words)) {
          return words.replace(ENG.ENDS_TEN, "ieth");
        }
        // Ends with one through twelve
        else if (ENG.ENDS_SPECIAL.test(words)) {
          return words.replace(ENG.ENDS_SPECIAL, replaceFirstVariant);
        }
        return words;
      }

      function replaceFirstVariant(numberWord) {
        return eng.VAR_CHANGING.ordinalLess[numberWord];
      }

      function generateWords(number) {
        var remainder, word, words = arguments[1];
        var Eng = eng.NUM;

        // We’re done
        if (number === 0) {
          return !words ? Eng.LESS_THAN_TWENTY[0] : words.join(" ").replace(/,$/, "");
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
          word = Eng.LESS_THAN_TWENTY[number];
        } else if (number < ONE_HUNDRED) {
          remainder = number % TEN;
          word = Eng.LESS_THAN_HUNDR[Math.floor(number / TEN)];
          if (remainder) {
            word += "-" + Eng.LESS_THAN_TWENTY[remainder];
            remainder = 0;
          }          
        } else if (number < ONE_THOUSAND) {
          remainder = number % ONE_HUNDRED;
          word = generateWords(Math.floor(number / ONE_HUNDRED)) + Eng.BIGEST_NUM[0];
        } else if (number < ONE_MILLION) {
          remainder = number % ONE_THOUSAND;
          word = generateWords(Math.floor(number / ONE_THOUSAND)) + Eng.BIGEST_NUM[1];
        } else if (number < ONE_BILLION) {
          remainder = number % ONE_MILLION;
          word = generateWords(Math.floor(number / ONE_MILLION)) + Eng.BIGEST_NUM[2];
        } else if (number < ONE_TRILLION) {
          remainder = number % ONE_BILLION;
          word = generateWords(Math.floor(number / ONE_BILLION)) + Eng.BIGEST_NUM[3];
        } else if (number < ONE_QUADRILLION) {
          remainder = number % ONE_TRILLION;
          word = generateWords(Math.floor(number / ONE_TRILLION)) + Eng.BIGEST_NUM[4];
        }

        words.push(word);
        return generateWords(remainder, words);
      }

      // // ////////////////////////   Deutsche   ////////////////////////////////
    } else {
      //  Converts a number-word into an ordinal number-word.
      function makeOrdinal(words) {
        var DET = det.VAR_CHANGING;
        // exceptions 1, 3, 7, 8
        if (DET.ENDS_SPECIAL.test(words)) {
          return words.replace(DET.ENDS_SPECIAL, replaceFirstVariant);
        }
        // 2 ->  19
        else if (DET.ENDS_TEEN.test(words)) {
          return words + "t";
          // all
        } else {
          return words + "st";
        }
        return words;
      }

      function replaceFirstVariant(numberWord) {
        return det.VAR_CHANGING.ordinalLess[numberWord];
      }

      function generateWords(number) {
        var index, remainder, word, words = arguments[1];
        var Det = det.NUM;
        function newFun(number, razryad, indexChisla) {
          remainder = number % razryad;
          index = Math.floor(number / razryad);
          word = (index == 1) ? Det.EXEPT[index] +  Det.BIGEST_NUM[indexChisla]:
          generateWords(Math.floor(number / razryad)) +  Det.BIGEST_NUM[indexChisla];
          index = 0;
          return number;
        }

        if (number === 0) {
          return !words ? Det.LESS_THAN_TWENTY[0] : words.join(" ").replace(/,$/, "");
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
          word = Det.LESS_THAN_TWENTY[number];
        } else if (number < ONE_HUNDRED) {
          remainder = number % TEN;
          word = Det.LESS_THAN_HUNDR[Math.floor(number / TEN)];
					word = (remainder == 1) ? Det.EXEPT[remainder] + "und" + word:
					Det.LESS_THAN_TWENTY[remainder] + "und" + word;
          remainder = 0;
        } else if (number < ONE_THOUSAND) {   
            newFun(number, ONE_HUNDRED, 0);
        } else if (number < ONE_MILLION) {
          newFun(number, ONE_THOUSAND, 1);
        } else if (number < ONE_BILLION) {
          newFun(number, ONE_MILLION, 2);
        } else if (number < ONE_TRILLION) {
					newFun(number, ONE_BILLION, 3);          
        } else if (number < ONE_QUADRILLION) {
					newFun(number, ONE_TRILLION, 4);
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
