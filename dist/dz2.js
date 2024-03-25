"use strict";
const instructions = {
    "SET A": 0,
    "PRINT A": 1,
    "IFN A": 2,
    RET: 3,
    "DEC A": 4,
    JMP: 5,
};
const program = [
    // Ставим значения аккумулятора
    instructions["SET A"],
    // В 10
    10,
    // Выводим значение на экран
    instructions["PRINT A"],
    // Если A равно 0
    instructions["IFN A"],
    // Программа завершается
    instructions["RET"],
    // И возвращает 0
    0,
    // Уменьшаем A на 1
    instructions["DEC A"],
    // Устанавливаем курсор выполняемой инструкции
    instructions["JMP"],
    // В значение 2
    2,
];
const execute = (byteCodeInstructions = []) => {
    let operation = null;
    let variable = null;
    for (let i = 0; i < byteCodeInstructions.length; i++) {
        if (operation) {
            switch (operation) {
                case "set":
                    variable = byteCodeInstructions[i];
                    operation = null;
                    break;
                case "ifn":
                    if (variable !== 0) {
                        operation = null;
                        i++;
                    }
                    break;
                case "ret":
                    return byteCodeInstructions[i];
                case "jmp":
                    i = byteCodeInstructions[i] - 1;
                    operation = null;
                    break;
            }
        }
        else {
            switch (byteCodeInstructions[i]) {
                case instructions["SET A"]:
                    operation = "set";
                    break;
                case instructions["PRINT A"]:
                    console.log(variable);
                    break;
                case instructions["IFN A"]:
                    operation = "ifn";
                    break;
                case instructions["RET"]:
                    operation = "ret";
                    break;
                case instructions["DEC A"]:
                    typeof variable === "number" && variable--;
                    break;
                case instructions["JMP"]:
                    operation = "jmp";
                    break;
                default:
                    break;
            }
        }
    }
};
execute(program);
