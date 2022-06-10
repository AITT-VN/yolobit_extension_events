import time
import _thread
from yolobit import *

_EVENT_TIMER = const(0)
_EVENT_MESSAGE = const(1)
_EVENT_CONDITION = const(2)

class EventManager:
    def __init__(self):
        self.events = []
        self._ticks = time.ticks_ms()

    def add_event(self, event):
        # event: {type: type, last_ticks:0, condition: None, message_index: 0, callback: None}
        if event.get('type') == _EVENT_TIMER:
          if event.get('interval') == None or event.get('interval') <= 0:
            return
          else:
            event['last_ticks'] = 0
        elif event.get('type') == _EVENT_MESSAGE:
          if event.get('message_index') == None or event.get('message_index') < 0:
            return
        elif event.get('type') == _EVENT_CONDITION:
          if event.get('condition') == None:
            return

        self.events.append(event)

    def run(self):
        self._ticks = time.ticks_ms()
        for event in self.events:
            if self._check_event(event):
                self._run_event(event)
    
    def broadcast_message(self, message_index):
      for event in self.events:
          if event.get('type') == _EVENT_MESSAGE and event.get('message_index') == message_index:
              self._run_event(event)
    
    def _check_event(self, event):
        if event.get('type') == _EVENT_TIMER:
          # check timing
          if (self._ticks - event.get('last_ticks')) >= event.get('interval'):
            event['last_ticks'] = self._ticks
            return True
        elif event.get('type') == _EVENT_CONDITION and event.get('condition') != None:
          # check condition
          return event.get('condition')()
        else:
          return False

    def _run_event(self, event):
      if event.get('callback') != None:
        _thread.start_new_thread(event.get('callback'), ())

event_manager = EventManager()

def unit_test():
    #from yolobit import *
    def on_button_a_pressed():
        global test
        test = True
        #event_manager.broadcast_message(0)

    button_a.on_pressed = on_button_a_pressed

    def on_button_b_pressed():
        global test
        test = False
        #event_manager.broadcast_message(1)

    button_b.on_pressed = on_button_b_pressed

    def callback_timer1():
        print("timer1")

    def callback_timer2():
        print("timer2")

    def callback_message1():
        print("message 1")
        for count in range(10):
            display.show(Image.HEART)
            display.show(Image.HEART_SMALL)

    def callback_message2():
        print("message 2")
        for count in range(10):
            display.set_all('#ff0000')
            time.sleep_ms(1000)
            display.set_all('#000000')
            time.sleep_ms(1000)

    def callback_condition1():
        global test
        test = False
        print("condition 1")
        for count in range(5):
            display.set_all('#00ff00')
            time.sleep_ms(1000)
            display.set_all('#000000')
            time.sleep_ms(1000)

    def callback_condition2():
        global test
        print("condition 2")
        display.set_all('#00ff00')
        time.sleep_ms(1000)
        display.set_all('#000000')
        time.sleep_ms(1000)
    
    event_manager.add_event({"type":_EVENT_TIMER, "interval": 1000, "callback":callback_timer1})
    event_manager.add_event({"type":_EVENT_TIMER, "interval": 2000, "callback":callback_timer2})
    event_manager.add_event({"type":_EVENT_TIMER, "interval": 0, "callback":callback_timer2})
    event_manager.add_event({"type":_EVENT_MESSAGE, "message_index": 0, "callback":callback_message1})
    event_manager.add_event({"type":_EVENT_MESSAGE, "message_index": 1, "callback":callback_message2})
    event_manager.add_event({"type":_EVENT_CONDITION, "condition": lambda:test, "callback":callback_condition1})
    event_manager.add_event({"type":_EVENT_CONDITION, "condition": lambda:accelerometer.is_gesture("tilt_left"), "callback":callback_condition2})

    test = False

    while True:
        event_manager.run()
        time.sleep_ms(100)

if __name__ == '__main__':
    unit_test()