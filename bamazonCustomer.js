var mysql = require('mysql');
var inquirer = require('inquirer')
// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "pass&wordpasswo&rd123",
    database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    displayAll();
});


function displayAll() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        console.table(results);
        buyItem();

    })
}

function buyItem() {
    // query the database for all items being sold
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        // once you have the items, prompt the user for which they'd like to bid on
        inquirer
            .prompt([
                {
                    name: "choice",
                    type: "rawlist",
                    choices: function () {
                        var choiceArray = [];
                        for (var i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].product_name);
                        }
                        return choiceArray;
                    },
                    message: "What product would you like to buy?"
                },
                {
                    name: "item",
                    type: "input",
                    message: "How many?"
                }
            ])
            .then(function (answer) {
                // get the information of the chosen item
                var chosenItem;
                for (var i = 0; i < results.length; i++) {
                    // search for chosen item and store in chosenItem
                    if (results[i].product_name === answer.choice) {
                        chosenItem = results[i];
                    }
                }

                //   determine if item was low enough
                if (chosenItem.stock_quantity > parseInt(answer.item)) {
                    if (err) throw err;
                    newValue = chosenItem.stock_quantity - parseInt(answer.item);
                    console.log("There are " + newValue + " " + chosenItem.product_name + " left!");
                    updateStock(newValue, chosenItem.item_id);
                }
                else {
                    if (err) throw err;
                    // stock quantity wasn't high enough, so apologize and start over
                    console.log("Looks like we are running short, sorry. Try again...");
                }
            });
    });
}

function updateStock(newValue, item_id) {
    console.log("Updating products...\n");
    var query = connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: newValue
            },
            {
                item_id: item_id
            }
        ],
        function (err, res) {
            console.log("Ready");
            inquirer
                .prompt([
                    {
                        name: "continue",
                        type: "confirm",
                        message: "Would you like to continue?"
                    }
                ])
                .then(function (inquirerResponse) {
                    if (inquirerResponse.continue) {

                        buyItem();
                    } else {
                        console.log("Bye!");
                        connection.end();
                    }
                });
        }
    )
}
