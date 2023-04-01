Blockly.Blocks["yolobit_events_timer"] = {
  init: function () {
    this.jsonInit({
      colour: "#eec543",
      tooltip: "Thực hiện các hành động được khai báo sau mỗi thời gian cố định",
      message0: "sau mỗi %1 %2 giây thực hiện %3 %4",
      args0: [
        { type: "input_dummy" },
        {
          type: "input_value",
          name: "INTERVAL",
          check: "Number"
        },
        { type: "input_dummy" },
        {
          type: "input_statement", 
          name: "ACTION"
        }
      ],
    
      helpUrl: "",
    });
  },
};
  
Blockly.Python["yolobit_events_timer"] = function (block) {
  Blockly.Python.definitions_['import_event_manager'] = 'from event_manager import *';
  Blockly.Python.definitions_['import_event_manager_reset'] = 'event_manager.reset()';

  var block_id = block.id.split('').filter(char => /[a-zA-Z]/.test(char)).slice(0, 5);
  var interval = Blockly.Python.valueToCode(block, 'INTERVAL', Blockly.Python.ORDER_ATOMIC);
  var statements_action = Blockly.Python.statementToCode(block, 'ACTION');
  // TODO: Assemble Python into code variable.
  var globals = [];
  var varName;
  var workspace = block.workspace;
  var variables = workspace.getAllVariables() || [];
  for (var i = 0, variable; variable = variables[i]; i++) {
    varName = variable.name;
    globals.push(Blockly.Python.variableDB_.getName(varName,
      Blockly.Names.NameType?Blockly.Names.NameType.VARIABLE:Blockly.Variables.NAME_TYPE));
  }
  globals = globals.length ? Blockly.Python.INDENT + 'global ' + globals.join(', ') : '';

  var cbFunctionName = Blockly.Python.provideFunction_(
    'on_event_timer_callback_'  + block_id,
    ['def ' + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '():',
      globals,
      statements_action || Blockly.Python.PASS
    ]);

  // TODO: Assemble Python into code variable.
  var code = 'event_manager.add_timer_event(' + interval*1000 + ', ' + cbFunctionName + ')\n';
  Blockly.Python.definitions_['on_event_timer_callback_' + block.id] = code;
  return '';
  //return code;
};

Blockly.Blocks["yolobit_events_condition"] = {
  init: function () {
    this.jsonInit({
      colour: "#eec543",
      tooltip: "Thực hiện các hành động được khai báo sau mỗi khi điều kiện được thỏa",
      message0: "khi %1 thực hiện %2 %3",
      args0: [
        { type: "input_value", name: "CONDITION", check: "Boolean" },
        { type: "input_dummy" },
        {
          type: "input_statement", 
          name: "ACTION"
        }          
      ],
    
      helpUrl: "",
    });
  },
};
  
Blockly.Python["yolobit_events_condition"] = function (block) {
  Blockly.Python.definitions_['import_event_manager'] = 'from event_manager import *';
  Blockly.Python.definitions_['import_event_manager_reset'] = 'event_manager.reset()';

  // TODO: Assemble Python into code variable.
  var block_id = block.id.split('').filter(char => /[a-zA-Z]/.test(char)).slice(0, 5);
  var globals = [];
  var varName;
  var workspace = block.workspace;
  var variables = workspace.getAllVariables() || [];
  for (var i = 0, variable; variable = variables[i]; i++) {
    varName = variable.name;
    globals.push(Blockly.Python.variableDB_.getName(varName,
      Blockly.Names.NameType?Blockly.Names.NameType.VARIABLE:Blockly.Variables.NAME_TYPE));
  }
  globals = globals.length ? Blockly.Python.INDENT + 'global ' + globals.join(', ') : '';

  var condition = Blockly.Python.valueToCode(block, 'CONDITION', Blockly.Python.ORDER_ATOMIC);
  
  if (condition == '') {
    return '';
  }

  var statements_action = Blockly.Python.statementToCode(block, 'ACTION');
  var cbFunctionName = Blockly.Python.provideFunction_(
    'on_event_condition_callback_' + block_id,
    ['def ' + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '():',
      globals,
      statements_action || Blockly.Python.PASS
    ]);
  
  // TODO: Assemble Python into code variable.
  var code = 'event_manager.add_condition_event(lambda:' + condition + ', ' + cbFunctionName + ')\n';
  Blockly.Python.definitions_['on_event_condition_callback_' + block.id] = code;
  return '';
};


Blockly.Blocks["yolobit_events_message"] = {
  init: function () {
    this.jsonInit({
      colour: "#eec543",
      tooltip: "Thực hiện các hành động được khai báo mỗi khi thông điệp được phát ra",
      message0: "khi nhận được %1 thực hiện %2 %3",
      args0: [
        {
          type: "field_dropdown",
          name: "MESSAGE",
          options: [
            ["thông điệp 1", "0"],
            ["thông điệp 2", "1"],
            ["thông điệp 3", "2"],
            ["thông điệp 4", "3"],
            ["thông điệp 5", "4"],
            ["thông điệp 6", "5"],
            ["thông điệp 7", "6"],
            ["thông điệp 8", "7"],
            ["thông điệp 9", "8"],
            ["thông điệp 10", "9"],
            ["thông điệp 11", "10"],
            ["thông điệp 12", "11"],
            ["thông điệp 13", "12"],
            ["thông điệp 14", "13"],
            ["thông điệp 15", "14"],
            ["thông điệp 16", "15"],
            ["thông điệp 17", "16"],
            ["thông điệp 18", "17"],
            ["thông điệp 19", "18"],
            ["thông điệp 20", "19"],
          ],
        },
        { type: "input_dummy" },
        {
          type: "input_statement", 
          name: "ACTION"
        }          
      ],
    
      helpUrl: "",
    });
  },
};
  
Blockly.Python["yolobit_events_message"] = function (block) {
  Blockly.Python.definitions_['import_event_manager'] = 'from event_manager import *';
  Blockly.Python.definitions_['import_event_manager_reset'] = 'event_manager.reset()';

  // TODO: Assemble Python into code variable.
  var block_id = block.id.split('').filter(char => /[a-zA-Z]/.test(char)).slice(0, 5);
  var globals = [];
  var varName;
  var workspace = block.workspace;
  var variables = workspace.getAllVariables() || [];
  for (var i = 0, variable; variable = variables[i]; i++) {
    varName = variable.name;
    globals.push(Blockly.Python.variableDB_.getName(varName,
      Blockly.Names.NameType?Blockly.Names.NameType.VARIABLE:Blockly.Variables.NAME_TYPE));
  }
  globals = globals.length ? Blockly.Python.INDENT + 'global ' + globals.join(', ') : '';

  var message_index = block.getFieldValue('MESSAGE');
  var statements_action = Blockly.Python.statementToCode(block, 'ACTION');
  var cbFunctionName = Blockly.Python.provideFunction_(
    'on_event_message_callback_' + block_id,
    ['def ' + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '():',
      globals,
      statements_action || Blockly.Python.PASS
    ]);
  
  // TODO: Assemble Python into code variable.
  var code = 'event_manager.add_message_event(' + message_index + ', ' + cbFunctionName + ')\n';
  Blockly.Python.definitions_['on_event_message_callback_' + block.id] = code;
  return '';
};

Blockly.Blocks["yolobit_events_broadcast_message"] = {
  init: function () {
    this.jsonInit({
      colour: "#eec543",
      tooltip: "Phát ra thông điệp để kích hoạt các sự kiện đã đăng ký nhận",
      message0: "gửi ra %1",
      args0: [
        {
          type: "field_dropdown",
          name: "MESSAGE",
          options: [
            ["thông điệp 1", "0"],
            ["thông điệp 2", "1"],
            ["thông điệp 3", "2"],
            ["thông điệp 4", "3"],
            ["thông điệp 5", "4"],
            ["thông điệp 6", "5"],
            ["thông điệp 7", "6"],
            ["thông điệp 8", "7"],
            ["thông điệp 9", "8"],
            ["thông điệp 10", "9"],
            ["thông điệp 11", "10"],
            ["thông điệp 12", "11"],
            ["thông điệp 13", "12"],
            ["thông điệp 14", "13"],
            ["thông điệp 15", "14"],
            ["thông điệp 16", "15"],
            ["thông điệp 17", "16"],
            ["thông điệp 18", "17"],
            ["thông điệp 19", "18"],
            ["thông điệp 20", "19"],
          ],
        },
      ],
      previousStatement: null,
      nextStatement: null,
      helpUrl: "",
    });
  },
};
  
Blockly.Python["yolobit_events_broadcast_message"] = function (block) {
  Blockly.Python.definitions_['import_event_manager'] = 'from event_manager import *';
  Blockly.Python.definitions_['import_event_manager_reset'] = 'event_manager.reset()';

  // TODO: Assemble Python into code variable.
  var message_index = block.getFieldValue('MESSAGE');
  // TODO: Assemble Python into code variable.
  var code = 'event_manager.broadcast_message(' + message_index + ')\n';
  return code;
};

Blockly.Blocks["yolobit_events_run"] = {
  init: function () {
    this.jsonInit({
      colour: "#eec543",
      tooltip: "Xử lý các sự kiện đã khai báo",
      message0: "xử lý sự kiện",
      previousStatement: null,
      nextStatement: null,
      helpUrl: "",
    });
  },
};

Blockly.Python['yolobit_events_run'] = function(block) {
  Blockly.Python.definitions_['import_event_manager'] = 'from event_manager import *';
  Blockly.Python.definitions_['import_event_manager_reset'] = 'event_manager.reset()';
  // TODO: Assemble Python into code variable.
  var code = 'event_manager.run()\n';
  return code;
};