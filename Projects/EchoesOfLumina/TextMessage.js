class TextMessage {
    constructor({ text, onConmplete }){
        this.text = text;
        this.onConmplete = onConmplete;
        this.element = null;

    }
// creating text boxes
    createElement(){
this.element = document.createElement("div");
this.element.class.add("TextMessage")
// this element only has one button to add text
this.element.innerHTML = (`
        <p>class = "TextMessage_button_p">${this.text}</p>
        <button class = "TextMessage_button">Next</button>
`)

this.element.querySelector("button").addEventListener("click", () => {
    //Close the text message
    this.done();
  });

  this.actionListener = new KeyPressListener("Enter", () => {
    // this.actionListener.unbind();
    console.log("found entrance")
    
    // this.done();
  })

}

done() {
  this.element.remove();
  this.onComplete();
}

    init(container) {
        this.createElement();
        container.appendChild(this.element)

    }

}