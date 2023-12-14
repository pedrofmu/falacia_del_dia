from flask import Flask, jsonify 
from initialice_word import WordManager 
import threading

app = Flask(__name__)

word_manager = WordManager()

change_word_thread = threading.Thread(target=word_manager.startChangingWords)
change_word_thread.start()

@app.route("/api")
def return_falacia():
    return jsonify(word_manager.json_data) 

app.run(host='0.0.0.0', port=5000, debug=True)

change_word_thread.join()
