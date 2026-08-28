# Trade Floor

A deal calculator and case display for a trading card table. One page, no
install, no account, and it runs with no internet once it has been opened once.

Built for a vending table at a card show, where the wifi is bad, the phone
battery is worse, and someone is standing in front of you waiting for a number.

## What it does

**Table.** A picture of your actual display case. Cards sit in rows, you drag
them anywhere, and a card that sells leaves a marked hole so you can see what to
pull from the binder. Beside it sits the deal calculator:

- **Trade.** Put your card down and it tells you the market value the other side
  has to bring, then fills a bar as they add cards.
- **Sell.** Their offer against your floor, plus the number to counter with.
- **Buy.** The most you should pay, and your walk-away point.

Profit stays hidden behind a button, so you can turn the screen around.
Press `C` for a stripped-down buyer view with one big number and nothing else.

**Prep.** Import a spreadsheet of your cards, fill in market prices
automatically, and print a price list. Do this at home, where there is internet.

**Day.** Every sale and trade logged, with the day's totals.

**Lot.** The 116 card binder bought as a job lot at 80% of value on 24 August
2026, with a photo of every card. The values are frozen at that date on purpose:
a card sold in November is still measured against what it actually cost. Mark a
card as in the binder, on the table, or sold, type what you got for it, and the
bar at the top shows how close the lot is to paying for itself. The twelve cards
that were in the binder that day and are missing from the Deck Tradr export are
marked sold already, waiting for a price.

## Running it

Open `index.html`. That is the whole setup.

On a phone, open the hosted address and add it to your home screen. That makes
it full screen, keeps it working offline, and stops the browser clearing your
cards out.

## Your numbers

The four percentages ship deliberately cautious. Set them to your own before
your first show. They are saved in your browser and never leave your device.

## Where your data lives

In your browser, in a local database, and nowhere else. There is no server and
no account. Use **Save a backup file** in Prep to export a spreadsheet copy.

## Prices

Market values come from the Pokémon TCG API, which carries TCGplayer figures and
refreshes daily. A free key from `dev.pokemontcg.io`, pasted into Prep, raises
the lookup limit a long way. Sold listings are not available from any service,
so check your best cards by hand and type over anything you disagree with.
