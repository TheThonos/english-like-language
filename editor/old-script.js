class Editor {
    constructor(source) {
      this.history = [];
      this.undo = 0;
      this.redo = null;
  
      this.def = (x) => typeof x !== "undefined";
      this.log = (c) => (this.def(c) ? console.log(c) : 0);
      this.area = source;
  
      history[this.undo] = {
        value: this.area.value,
        selectionStart: 0,
        selectionEnd: 0
      };
  
      this.undo++;
    }
  
      /**
       * Collect data from selected text inside a textarea
       *
       * <code>
       *   var editor = new Editor(elem);
       *   elem.onmouseup = function() {
       *       alert(editor.selection().start);
       *       alert(editor.selection().end);
       *       alert(editor.selection().value);
       *   };
       * </code>
       *
       */
    selection() {
      let start = this.area.selectionStart,
        end = this.area.selectionEnd,
        value = this.area.value.substring(start, end),
        before = this.area.value.substring(0, start),
        after = this.area.value.substring(end),
        data = {
          start: start,
          end: end,
          value: value,
          before: before,
          after: after
        };
      //this.log(data);
      return data;
    }
  
      /**
       * Select portion of text inside a textarea
       *
       * <code>
       *   var editor = new Editor(elem);
       *   editor.select(7, 11);
       * </code>
       *
       */
    select(start, end, callback) {
      this.area.focus();
      this.area.setSelectionRange(start, end);
      if (typeof callback == "function") callback();
    }
  
      /**
       * Replace portion of selected text inside a textarea with something
       *
       * <code>
       *   var editor = new Editor(elem);
       *   editor.replace(/foo/, "bar");
       * </code>
       *
       */
    replace(from, to, callback) {
      let sel = this.selection(),
        start = sel.start,
        end = sel.end,
        selections = sel.value.replace(from, to);
      this.area.value = sel.before + selections + sel.after;
      this.select(start, start + selections.length);
      if (typeof callback == "function") {
        callback();
      } else {
        this.updateHistory({
          value: this.area.value,
          selectionStart: start,
          selectionEnd: start + selections.length
        });
      }
    }
  
      /**
       * Replace selected text inside a textarea with something
       *
       * <code>
       *   var editor = new Editor(elem);
       *   editor.insert('foo');
       * </code>
       *
       */
    insert(insertion, callback) {
      let sel = this.selection(),
        start = sel.start,
        end = sel.end;
  
      this.area.value = sel.before + insertion + sel.after;
      this.select(start + insertion.length, start + insertion.length);
  
      if (typeof callback == "function") {
        callback();
      } else {
        this.updateHistory({
          value: this.area.value,
          selectionStart: start + insertion.length,
          selectionEnd: start + insertion.length
        });
      }
    }
  
      /**
       * Wrap selected text inside a textarea with something
       *
       * <code>
       *   var editor = new Editor(elem);
       *   editor.wrap('<strong>', '</strong>');
       * </code>
       *
       */
    wrap(open, close, callback) {
      let sel = this.selection(),
        selections = sel.value,
        before = sel.before,
        after = sel.after;
  
      this.area.value = before + open + selections + close + after;
      this.select(
        before.length + open.length,
        before.length + open.length + selections.length
      );
  
      if (typeof callback == "function") {
        callback();
      } else {
        this.updateHistory({
          value: this.area.value,
          selectionStart: before.length + open.length,
          selectionEnd: before.length + open.length + selections.length
        });
      }
    }
  
      /**
       * Indent selected text inside a textarea with something
       *
       * <code>
       *   var editor = new Editor(elem);
       *   editor.indent('\t');
       * </code>
       *
       */
    indent(chars, callback) {
      let sel = this.selection();
      if (sel.value.length > 0) {
        // Multi line
        this.replace(/(^|\n)([^\n])/gm, "$1" + chars + "$2", callback);
      } else {
        // Single line
  
        this.area.value = sel.before + chars + sel.value + sel.after;
        this.select(sel.start + chars.length, sel.start + chars.length);
  
        if (typeof callback == "function") {
          callback();
        } else {
          this.updateHistory({
            value: this.area.value,
            selectionStart: sel.start + chars.length,
            selectionEnd: sel.start + chars.length
          });
        }
      }
    }
  
      /**
       * Outdent selected text inside a textarea from something
       *
       * <code>
       *   var editor = new Editor(elem);
       *   editor.outdent('\t');
       * </code>
       *
       */
    outdent(chars, callback) {
      let sel = this.selection();
  
      if (sel.value.length > 0) {
        // Multi line
        this.replace(new RegExp("(^|\n)" + chars, "gm"), "$1", callback);
      } else {
        // Single line
  
        let before = sel.before.replace(new RegExp(chars + "$"), "");
        this.area.value = before + sel.value + sel.after;
        this.select(before.length, before.length);
  
        if (typeof callback == "function") {
          callback();
        } else {
          this.updateHistory({
            value: this.area.value,
            selectionStart: before.length,
            selectionEnd: before.length
          });
        }
      }
    }
  
      /**
       * Call available history data
       *
       * <code>
       *   var editor = new Editor(elem);
       *   alert(editor.callHistory(2).value);
       *   alert(editor.callHistory(2).selectionStart);
       *   alert(editor.callHistory(2).selectionEnd);
       * </code>
       *
       */
    callHistory(index) {
      return typeof index == "number" ? this.history[index] : this.history;
    }
  
      /**
       * Update history data
       *
       * <code>
       *   var editor = new Editor(elem);
       *   editor.area.onkeydown = function() {
       *       editor.updateHistory();
       *   };
       * </code>
       *
       */
    updateHistory(data, index) {
      let value =
        typeof data != "undefined"
          ? data
          : {
            value: this.area.value,
            selectionStart: this.selection().start,
            selectionEnd: this.selection().end
          };
  
      this.history[typeof index == "number" ? index : this.undo] = value;
      this.undo++;
    }
  
      /**
       * Undo from previous action or previous Redo
       *
       * <code>
       *   var editor = new Editor(elem);
       *   editor.undo();
       * </code>
       *
       */
    undo(callback) {
      let data;
      if (this.history.length > 1) {
        if (this.undo > 1) {
          this.undo--;
        } else {
          this.undo = 1;
        }
        data = this.callHistory(this.undo - 1);
        this.redo = this.undo <= 0 ? this.undo - 1 : this.undo;
      } else {
        return;
      }
      this.area.value = data.value;
      this.select(data.selectionStart, data.selectionEnd);
      if (typeof callback == "function") callback();
    }
  
      /**
       * Redo from previous Undo
       *
       * <code>
       *   var editor = new Editor(elem);
       *   editor.redo();
       * </code>
       *
       */
  
    redo(callback) {
      let data;
      if (this.redo !== null) {
        data = this.callHistory(this.redo);
        if (this.redo < this.history.length - 1) {
          this.redo++;
        } else {
          this.redo = this.history.length - 1;
        }
        this.undo = this.redo >= history.length - 1 ? this.redo + 1 : this.redo;
      } else {
        return;
      }
      this.area.value = data.value;
      this.select(data.selectionStart, data.selectionEnd);
      // console.log(redo);
      if (typeof callback == "function") callback();
    }
  }
  
  // short querySelector
  const _ = (el) => document.querySelector(el);
  // init editor
  const editor = new Editor(_("#editor"));
  editor.area.onkeydown = (evt) => {
    // Press `Shift + Enter` to add a line break
    if (evt.shiftKey && evt.keyCode == 13) {
      //editor.insert("<br>\n");
          //idk what to do here
      return false;
    }
    // Press `Ctrl + Enter` to create a new paragraph
    if (evt.ctrlKey && evt.keyCode == 13) {
      // Do the run here
      return false;
    }
    // Press `Shift + Tab` to outdent
    if (evt.shiftKey && evt.keyCode == 9) {
      editor.outdent("\t");
      return false;
    }
    // Press `Tab` to indent
    if (evt.keyCode == 9) {
      editor.indent("\t");
      return false;
    }
  
    if(evt.keyCode == 13) {
      editor.insert("\b");
      return false;
    }
  };
  
  editor.area.on
  
  function escapeHTML(unsafe){
    return unsafe
      .replace(new RegExp('&', 'g'), "&amp;")
      .replace(new RegExp('<', 'g'), "&lt;")
      .replace(new RegExp('>', 'g'), "&gt;")
      .replace(new RegExp('"', 'g'), "&quot;")
      .replace(new RegExp('\'', 'g'), "&#039;");
   }
  
  
  /**
   *  ========================================================
   *      Demo
   *  ========================================================
   */
  /*
  // sleep(ms).then(() => console.log('hi'))
  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };
  // create tag
  // create([object],[parent],{arguments})
  const create = (element, where, args) => {
    let d = document.createElement(element);
    if (args) for (const [k, v] of Object.entries(args)) d[k] = v;
    where.appendChild(d);
    return d;
  };
  
  editor.insert("Hello World\n");
  sleep(1000).then(() => editor.insert("How do you do\n"));
  sleep(1500).then(() => editor.select(0, _("#editor").value.length));
  sleep(2000).then(() => editor.insert("This is a editor text\n"));
  sleep(3000).then(() => editor.insert("you can create custom editor\n"));
  sleep(4000).then(() => editor.wrap("<main>\n", "</main>\n"));
  sleep(5000).then(() => editor.insert("<h3>Width tags</h3>\n"));
  sleep(6000).then(() => editor.wrap("<p>", "</p>\n"));
  sleep(6500).then(() => editor.indent("\t"));
  sleep(7000).then(() => editor.indent("\t"));
  sleep(7500).then(() => editor.insert("indent code\n"));
  sleep(8000).then(() => editor.insert("Select all\n"));
  sleep(9000).then(() => editor.select(0, _("#editor").value.length));
  sleep(10000).then(() => editor.insert("or select something\n"));
  sleep(11000).then(() => editor.select(0, 9));
  sleep(12000).then(() => editor.insert(""));
  sleep(13000).then(() => editor.insert("or search "));
  sleep(13500).then(() => editor.select(0, _("#editor").value.length));
  sleep(14000).then(() => editor.insert("also you can create buttons"));
  sleep(15000).then(() => {
    create("button", _(".app"), {
      textContent: "Click me :)",
      onclick: function () {
        editor.select(0, _("#editor").value.length);
        editor.wrap("<p>", "<p>\n");
        editor.insert("Voila!");
        sleep(1000).then(() => editor.select(0, _("#editor").value.length));
        sleep(1500).then(() => editor.insert(""));
        sleep(2000).then(() => editor.insert("Now, create your app :)"));
        sleep(2500).then(() => _(".app").removeChild(this));
      }
    });
  });
  sleep(15500).then(() => editor.select(0, _("#editor").value.length));
  sleep(16000).then(() => editor.insert(""));
  sleep(16500).then(() => editor.insert("Now you can click on button"));
  */