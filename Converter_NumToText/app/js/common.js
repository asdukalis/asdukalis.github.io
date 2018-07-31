
	$(document).ready(function() {
    // СТАРТ
   
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

        if ($("#first").is(":checked")) {
          // Ukrain
          var ENDS_WITH_TEEN_PATTERN = /надцять$/;
          var ENDS_WITH_Y_PATTERN = /сят$/;
          var ENDS_WITH_ZERO_THROUGH_TWELVE_PATTERN = /(нуль|один|два|три|чотири|п'ять|шість|сім|вісім|дев'ять|десять|сорок|двадцять|тридцять|девяносто|сто|тысяча|мільйон|мільярд|трильйон)$/;
          var ordinalLessThanThirteen = { одна: "перший", двi: "другий", нуль: "нульовий", один: "перший", два: "другий", три: "третій", чотири: "четвертий", "п'ять": "п'ятьтий", шість: "шостий", сім: "сьомий", вісім: "восьмий", "дев'ять": "дев'ятий", десять: "десятий", двадцять: "двадцятий", тридцять: "тридцятий", сорок: "сороковий", девяносто: "дев'яностий", сто: "сотий", тысяча: "тысячний", мільйон: "мiльйoний", мільярд: "мільярдний", трильйон: "трильйонний" };

          // Преобразует числовое слово в порядковое числовое слово

          function makeOrdinal(words) {
            // Ends with *00 (100, 1000, etc.) or *teen (13, 14, 15, 16, 17, 18, 19)
            if (ENDS_WITH_TEEN_PATTERN.test(words)) {
              return words.replace(ENDS_WITH_TEEN_PATTERN, "надцятий");
            }
            // Ends with (50, 60, 70, 80)
            else if (ENDS_WITH_Y_PATTERN.test(words)) {
              return words.replace(ENDS_WITH_Y_PATTERN, "сятий");
            }
            // Ends with 1 through 10
            else if (ENDS_WITH_ZERO_THROUGH_TWELVE_PATTERN.test(words)) {
              return words.replace(ENDS_WITH_ZERO_THROUGH_TWELVE_PATTERN, replaceWithOrdinalVariant);
            }
            return words;
          }

          function replaceWithOrdinalVariant(match, numberWord) {
            return ordinalLessThanThirteen[numberWord];
          }

          var TEN = 10;
          var ONE_HUNDRED = 100;
          var ONE_THOUSAND = 1000;
          var ONE_MILLION = 1000000;
          var ONE_BILLION = 1000000000;
          var ONE_TRILLION = 1000000000000;
          var ONE_QUADRILLION = 1000000000000000;

          var LESS_THAN_TWENTY = ["", "один", "два", "три", "чотири", "п'ять", "шість", "сім", "вісім", "дев'ять", "десять", "одинадцять", "дванадцять", "тринадцять", "чотирнадцять", "п'ятнадцять", "шістнадцять", "сімнадцять", "вісімнадцять", "дев'ятнадцять"];

          var TENTHS_LESS_THAN_HUNDRED = ["", "десять", "двадцять", "тридцять", "сорок", "п'ятдесят", "шістдесят", "сімдесят", "вісімдесят", "девяносто"];

          var TENTHS_LESS_THAN_THOUSAND = ["", "сто", "двісті", "триста", "чотириста", "п'ятсот", "шістсот", "сімсот", "вісімсот", "дев'ятьсот"];

          //  Converts an integer into words.
          //  If number is decimal, the decimals will be removed.

          function toWords(number, asOrdinal) {
            var words;
            var num = parseInt(number, 10);
            words = generateWords(num);
            return asOrdinal ? makeOrdinal(words) : words;
          }

          function generateWords(number) {
            var remainder,
              word,
              words = arguments[1];

            // We’re done
            if (number === 0) {
              return !words ? "нуль" : words.join(" ").replace(/,$/, "");
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
              word = LESS_THAN_TWENTY[number];
            } else if (number < ONE_HUNDRED) {
              remainder = number % TEN;
              word = TENTHS_LESS_THAN_HUNDRED[Math.floor(number / TEN)];
              if (remainder) {
                word += " " + LESS_THAN_TWENTY[remainder];
                remainder = 0;
              }
            } else if (number < ONE_THOUSAND) {
              remainder = number % ONE_HUNDRED;
              word = TENTHS_LESS_THAN_THOUSAND[Math.floor(number / ONE_HUNDRED)];
              if (word < ONE_HUNDRED) {
                reremainder = number % TEN;
                reword += " " + LESS_THAN_TWENTY[reremainder] + " " + TENTHS_LESS_THAN_THOUSAND[remainder];
                remainder = 0;
              }
            } else if (number < ONE_MILLION) {
              remainder = number % ONE_THOUSAND;
              word = generateWords(Math.floor(number / ONE_THOUSAND));
              var numLength = Math.floor(number / ONE_THOUSAND).toString().length;
              var lastCharr;
              if (numLength == 3) {
                lastCharr = Math.floor(number / ONE_THOUSAND) % 100;
                if (lastCharr > 20) {
                  lastCharr = Math.floor(number / ONE_THOUSAND) % 10;
                  if (lastCharr > 4 || lastCharr == 0) {
                    word = word + " тисяч ";
                  } else if (lastCharr == 2 || lastCharr == 3 || lastCharr == 4) {
                    if (lastCharr == 2) {
                      word = "дві";
                    }
                    word = word + " тисячі ";
                  } else if (lastCharr == 1) {
                    word = "одна" + " тисяча "; // тут меняем один на одна
                  }
                } else if ((lastCharr > 4 && lastCharr <= 20) || lastCharr == 0) {
                  word = word + " тисяч ";
                } else if (lastCharr == 2 || lastCharr == 3 || lastCharr == 4) {
                  if (lastCharr == 2) {
                    word = "дві";
                  }
                  word = word + " тисячі ";
                } else if (lastCharr == 1) {
                  word = "одна" + " тисяча "; // тут меняем один на одна
                }
              } else if (numLength <= 2) {
                lastCharr = Math.floor(number / ONE_THOUSAND);
                if (lastCharr > 20) {
                  lastCharr = Math.floor(number / ONE_THOUSAND) % 10;
                  if (lastCharr > 4 || lastCharr == 0) {
                    word = word + " тисяч ";
                  } else if (lastCharr == 2 || lastCharr == 3 || lastCharr == 4) {
                    if (lastCharr == 2) {
                      word = "дві";
                    }
                    word = word + " тисячі ";
                  } else if (lastCharr == 1) {
                    word = "одна" + " тисяча ";
                  }
                } else if ((lastCharr > 4 && lastCharr <= 20) || lastCharr == 0) {
                  word = word + " тисяч ";
                } else if (lastCharr == 2 || lastCharr == 3 || lastCharr == 4) {
                  if (lastCharr == 2) {
                    word = "дві";
                  }
                  word = word + " тисячі ";
                } else if (lastCharr == 1) {
                  word = "одна" + " тисяча ";
                }
              }
            } else if (number < ONE_BILLION) {
              remainder = number % ONE_MILLION;
              word = generateWords(Math.floor(number / ONE_MILLION));
              numLength = Math.floor(number / ONE_MILLION).toString().length;
              if (numLength == 3) {
                lastCharr = Math.floor(number / ONE_MILLION) % 100;
                if (lastCharr > 20) {
                  lastCharr = Math.floor(number / ONE_MILLION) % 10;
                  if (lastCharr > 4 || lastCharr == 0) {
                    word = word + " мільйонів ";
                  } else if (lastCharr == 2 || lastCharr == 3 || lastCharr == 4) {
                    word = word + " мільйона ";
                  } else if (lastCharr == 1) {
                    word = word + " мільйон ";
                  }
                } else if ((lastCharr > 4 && lastCharr <= 20) || lastCharr == 0) {
                  word = word + " мільйонів ";
                } else if (lastCharr == 2 || lastCharr == 3 || lastCharr == 4) {
                  word = word + " мільйона ";
                } else if (lastCharr == 1) {
                  word = word + " мільйон ";
                }
              } else if (numLength <= 2) {
                lastCharr = Math.floor(number / ONE_MILLION);
                if (lastCharr > 20) {
                  lastCharr = Math.floor(number / ONE_MILLION) % 10;
                  if (lastCharr > 4 || lastCharr == 0) {
                    word = word + " мільйонів ";
                  } else if (lastCharr == 2 || lastCharr == 3 || lastCharr == 4) {
                    word = word + " мільйона ";
                  } else if (lastCharr == 1) {
                    word = word + " мільйон ";
                  }
                } else if ((lastCharr > 4 && lastCharr <= 20) || lastCharr == 0) {
                  word = word + " мільйонів ";
                } else if (lastCharr == 2 || lastCharr == 3 || lastCharr == 4) {
                  word = word + " мільйона ";
                } else if (lastCharr == 1) {
                  word = word + " мільйон ";
                }
              }
            } else if (number < ONE_TRILLION) {
              remainder = number % ONE_BILLION;
              word = generateWords(Math.floor(number / ONE_BILLION));
              numLength = Math.floor(number / ONE_BILLION).toString().length;
              if (numLength == 3) {
                lastCharr = Math.floor(number / ONE_BILLION) % 100;
                if (lastCharr > 20) {
                  lastCharr = Math.floor(number / ONE_BILLION) % 10;
                  if (lastCharr > 4 || lastCharr == 0) {
                    word = word + " мільярдів ";
                  } else if (lastCharr == 2 || lastCharr == 3 || lastCharr == 4) {
                    word = word + " мільярда ";
                  } else if (lastCharr == 1) {
                    word = word + " мільярд ";
                  }
                } else if ((lastCharr > 4 && lastCharr <= 20) || lastCharr == 0) {
                  word = word + " мільярдів ";
                } else if (lastCharr == 2 || lastCharr == 3 || lastCharr == 4) {
                  word = word + " мільярда ";
                } else if (lastCharr == 1) {
                  word = word + " мільярд ";
                }
              } else if (numLength <= 2) {
                lastCharr = Math.floor(number / ONE_BILLION);
                if (lastCharr > 20) {
                  lastCharr = Math.floor(number / ONE_BILLION) % 10;
                  if (lastCharr > 4 || lastCharr == 0) {
                    word = word + " мільярдів ";
                  } else if (lastCharr == 2 || lastCharr == 3 || lastCharr == 4) {
                    word = word + " мільярда ";
                  } else if (lastCharr == 1) {
                    word = word + " мільярд ";
                  }
                } else if ((lastCharr > 4 && lastCharr <= 20) || lastCharr == 0) {
                  word = word + " мільярдів ";
                } else if (lastCharr == 2 || lastCharr == 3 || lastCharr == 4) {
                  word = word + " мільярда ";
                } else if (lastCharr == 1) {
                  word = word + " мільярд ";
                }
              }
            } else if (number < ONE_QUADRILLION) {
              remainder = number % ONE_TRILLION;
              word = generateWords(Math.floor(number / ONE_TRILLION));
              numLength = Math.floor(number / ONE_TRILLION).toString().length;
              if (numLength == 3) {
                lastCharr = Math.floor(number / ONE_TRILLION) % 100;
                if (lastCharr > 20) {
                  lastCharr = Math.floor(number / ONE_TRILLION) % 10;
                  if (lastCharr > 4 || lastCharr == 0) {
                    word = word + " трильйонів ";
                  } else if (lastCharr == 2 || lastCharr == 3 || lastCharr == 4) {
                    word = word + " трильйона ";
                  } else if (lastCharr == 1) {
                    word = word + " трильйон ";
                  }
                } else if ((lastCharr > 4 && lastCharr <= 20) || lastCharr == 0) {
                  word = word + " трильйонів ";
                } else if (lastCharr == 2 || lastCharr == 3 || lastCharr == 4) {
                  word = word + " трильйона ";
                } else if (lastCharr == 1) {
                  word = word + " трильйон ";
                }
              } else if (numLength <= 2) {
                lastCharr = Math.floor(number / ONE_TRILLION);
                if (lastCharr > 20) {
                  lastCharr = Math.floor(number / ONE_TRILLION) % 10;
                  if (lastCharr > 4 || lastCharr == 0) {
                    word = word + " трильйонів ";
                  } else if (lastCharr == 2 || lastCharr == 3 || lastCharr == 4) {
                    word = word + " трильйона ";
                  } else if (lastCharr == 1) {
                    word = word + " трильйон ";
                  }
                } else if ((lastCharr > 4 && lastCharr <= 20) || lastCharr == 0) {
                  word = word + " трильйонів ";
                } else if (lastCharr == 2 || lastCharr == 3 || lastCharr == 4) {
                  word = word + " трильйона ";
                } else if (lastCharr == 1) {
                  word = word + " трильйон ";
                }
              }
            }

            words.push(word);
            return generateWords(remainder, words);
          }

          // Converts a number into ordinal words.

          function toWordsOrdinal(number) {
            var words = toWords(number);
            return makeOrdinal(words);
          }
        } else if ($("#second").is(":checked")) {
          // English
          var ENDS_WITH_DOUBLE_ZERO_PATTERN = /(hundred|thousand|(m|b|tr|quadr)illion)$/;
          var ENDS_WITH_TEEN_PATTERN = /teen$/;
          var ENDS_WITH_Y_PATTERN = /y$/;
          var ENDS_WITH_ZERO_THROUGH_TWELVE_PATTERN = /(zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)$/;
          var ordinalLessThanThirteen = { zero: "zeroth", one: "first", two: "second", three: "third", four: "fourth", five: "fifth", six: "sixth", seven: "seventh", eight: "eighth", nine: "ninth", ten: "tenth", eleven: "eleventh", twelve: "twelfth" };

          //  Converts a number-word into an ordinal number-word.

          function makeOrdinal(words) {
            // Ends with *00 (100, 1000, etc.) or *teen (13, 14, 15, 16, 17, 18, 19)
            if (ENDS_WITH_DOUBLE_ZERO_PATTERN.test(words) || ENDS_WITH_TEEN_PATTERN.test(words)) {
              return words + "th";
            }
            // Ends with *y (20, 30, 40, 50, 60, 70, 80, 90)
            else if (ENDS_WITH_Y_PATTERN.test(words)) {
              return words.replace(ENDS_WITH_Y_PATTERN, "ieth");
            }
            // Ends with one through twelve
            else if (ENDS_WITH_ZERO_THROUGH_TWELVE_PATTERN.test(words)) {
              return words.replace(ENDS_WITH_ZERO_THROUGH_TWELVE_PATTERN, replaceWithOrdinalVariant);
            }
            return words;
          }

          function replaceWithOrdinalVariant(match, numberWord) {
            return ordinalLessThanThirteen[numberWord];
          }

          var TEN = 10;
          var ONE_HUNDRED = 100;
          var ONE_THOUSAND = 1000;
          var ONE_MILLION = 1000000;
          var ONE_BILLION = 1000000000;
          var ONE_TRILLION = 1000000000000;
          var ONE_QUADRILLION = 1000000000000000;

          var LESS_THAN_TWENTY = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];

          var TENTHS_LESS_THAN_HUNDRED = ["zero", "ten", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

          // Converts an integer into words.
          // If number is decimal, the decimals will be removed.

          function toWords(number, asOrdinal) {
            var words;
            var num = parseInt(number, 10);
            words = generateWords(num);
            return asOrdinal ? makeOrdinal(words) : words;
          }

          function generateWords(number) {
            var remainder,
              word,
              words = arguments[1];

            // We’re done
            if (number === 0) {
              return !words ? "zero" : words.join(" ").replace(/,$/, "");
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
              word = LESS_THAN_TWENTY[number];
            } else if (number < ONE_HUNDRED) {
              remainder = number % TEN;
              word = TENTHS_LESS_THAN_HUNDRED[Math.floor(number / TEN)];
              if (remainder) {
                word += "-" + LESS_THAN_TWENTY[remainder];
                remainder = 0;
              }
            } else if (number < ONE_THOUSAND) {
              remainder = number % ONE_HUNDRED;
              word = generateWords(Math.floor(number / ONE_HUNDRED)) + " hundred";
            } else if (number < ONE_MILLION) {
              remainder = number % ONE_THOUSAND;
              word = generateWords(Math.floor(number / ONE_THOUSAND)) + " thousand ";
            } else if (number < ONE_BILLION) {
              remainder = number % ONE_MILLION;
              word = generateWords(Math.floor(number / ONE_MILLION)) + " million ";
            } else if (number < ONE_TRILLION) {
              remainder = number % ONE_BILLION;
              word = generateWords(Math.floor(number / ONE_BILLION)) + " billion ";
            } else if (number < ONE_QUADRILLION) {
              remainder = number % ONE_TRILLION;
              word = generateWords(Math.floor(number / ONE_TRILLION)) + " trillion ";
            }

            words.push(word);
            return generateWords(remainder, words);
          }

          // Converts a number into ordinal words.
          function toWordsOrdinal(number) {
            var words = toWords(number);
            return makeOrdinal(words);
          }
        } else {
          // Deutsche
          var ENDS_WITH_ZERO_THROUGH_TWELVE_PATTERN1 = /(null|zwei|vier|fünf|sechs|neun|zehn|elf|zwölf|dreizehn|vierzehn|fünfzehn|sechzehn|siebzehn|achtzehn|neunzehn)$/;
          var ENDS_WITH_ZERO_THROUGH_TWELVE_PATTERN = /(eins|drei|sieben|acht)$/;
          var ordinalLessThanThirteen = { eins: "erste", drei: "dritte", sieben: "siebte", acht: "achte" };

          //  Converts a number-word into an ordinal number-word.

          function makeOrdinal(words) {
            // exceptions 1, 3, 7, 8
            if (ENDS_WITH_ZERO_THROUGH_TWELVE_PATTERN.test(words)) {
              return words.replace(ENDS_WITH_ZERO_THROUGH_TWELVE_PATTERN, replaceWithOrdinalVariant);
            }
            // 2 ->  19
            else if (ENDS_WITH_ZERO_THROUGH_TWELVE_PATTERN1.test(words)) {
              return words + "t";
              // all
            } else {
              return words + "st";
            }
            return words;
          }

          function replaceWithOrdinalVariant(match, numberWord) {
            return ordinalLessThanThirteen[numberWord];
          }

          // Converts an integer into a string with an ordinal postfix.
          // If number is decimal, the decimals will be removed.

          var TEN = 10;
          var ONE_HUNDRED = 100;
          var ONE_THOUSAND = 1000;
          var ONE_MILLION = 1000000;
          var ONE_BILLION = 1000000000;
          var ONE_TRILLION = 1000000000000;
          var ONE_QUADRILLION = 1000000000000000;

          var EXEPT = ["null", "ein", "eine"];

          var LESS_THAN_TWENTY = ["null", "eins", "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "neun", "zehn", "elf", "zwölf", "dreizehn", "vierzehn", "fünfzehn", "sechzehn", "siebzehn", "achtzehn", "neunzehn"];

          var TENTHS_LESS_THAN_HUNDRED = ["null", "zehn", "zwanzig", "dreißig", "vierzig", "fünfzig", "sechzig", "siebzig", "achtzig", "neunzig"];

          //  Converts an integer into words.
          //  If number is decimal, the decimals will be removed.

          function toWords(number, asOrdinal) {
            var words;
            var num = parseInt(number, 10);
            words = generateWords(num);
            return asOrdinal ? makeOrdinal(words) : words;
          }

          function generateWords(number) {
            var remainder,
              word,
              words = arguments[1];
            // We’re done
            if (number === 0) {
              return !words ? "null" : words.join(" ").replace(/,$/, "");
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
              word = LESS_THAN_TWENTY[number];
            } else if (number < ONE_HUNDRED) {
              remainder = number % TEN;
              word = TENTHS_LESS_THAN_HUNDRED[Math.floor(number / TEN)];
              if (remainder == 1) {
                word = EXEPT[remainder] + "und" + word;
                remainder = 0;
              } else if (remainder) {
                word = LESS_THAN_TWENTY[remainder] + "und" + word;
                remainder = 0;
              }
            } else if (number < ONE_THOUSAND) {
              remainder = number % ONE_HUNDRED;
              var index = Math.floor(number / ONE_HUNDRED);
              if (index == 1) {
                word = EXEPT[index] + "hundert";
                index = 0;
              } else {
                word = generateWords(Math.floor(number / ONE_HUNDRED)) + "hundert";
                index = 0;
              }
            } else if (number < ONE_MILLION) {
              remainder = number % ONE_THOUSAND;
              index = Math.floor(number / ONE_THOUSAND);
              if (index == 1) {
                word = EXEPT[index] + "tausend";
                index = 0;
              } else {
                word = generateWords(Math.floor(number / ONE_THOUSAND)) + "tausend";
                index = 0;
              }
            } else if (number < ONE_BILLION) {
              remainder = number % ONE_MILLION;
              index = Math.floor(number / ONE_MILLION);
              if (index == 1) {
                word = EXEPT[index + 1] + " Million ";
                index = 0;
              } else {
                word = generateWords(Math.floor(number / ONE_MILLION)) + " Million ";
                index = 0;
              }
            } else if (number < ONE_TRILLION) {
              remainder = number % ONE_BILLION;
              index = Math.floor(number / ONE_BILLION);
              if (index == 1) {
                word = EXEPT[index + 1] + " Milliarden ";
                index = 0;
              } else {
                word = generateWords(Math.floor(number / ONE_BILLION)) + " Milliarden ";
                index = 0;
              }
            } else if (number < ONE_QUADRILLION) {
              remainder = number % ONE_TRILLION;
              index = Math.floor(number / ONE_TRILLION);
              if (index == 1) {
                word = EXEPT[index + 1] + " Billionen ";
                index = 0;
              } else {
                word = generateWords(Math.floor(number / ONE_TRILLION)) + " Billionen ";
                index = 0;
              }
            }

            words.push(word);

            return generateWords(remainder, words);
          }

          //  Converts a number into ordinal words.

          function toWordsOrdinal(number) {
            var words = toWords(number);
            return makeOrdinal(words);
          }
		}
	});
});