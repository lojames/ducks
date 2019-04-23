# [Don't Miss](https://lojames.github.io/ducks/)

A browser based gallery style point and click shooter which uses HTML5, CSS3, and JavaScript.

<p align="center"><img src="https://i.ibb.co/WKLb4mc/ducks-1.png" alt="Don't Miss In Action"></p>

# How to Play
Click to hit targets to gain points and precious time.  Miss and you lose time.  You cannot shoot through the terrain (water, trees, grass) and please do not shoot the ducks.

<p align="center"><img src="https://i.ibb.co/crKNnh7/ducks.png" alt="Don't Miss Start Page"></p>

# Browser Compatibility
Confirmed to work:
* Chrome
* Firefox

Confirmed to not work:
* Edge
* Internet Explorer

# Basic Mechanics
1) You start with 10 seconds to click as many targets as you can.
2) Targets will spawn in one of 3 possible rows and either from the left or right side.
2) Gain precious time by hitting targets, but don't miss!
3) If you miss you'll lose time.
4) If a target despawns or reaches the opposite side of the spawn point, you'll also lose time.

# Detailed Mechanics
### Target Values
Base point values for targets are as follows:
* 1st Row: 1 point
* 2nd Row: 2 points
* 3rd Row: 3 points

### Hits
Consecutive hits result in a stacking time and point gain multiplier.   The multiplier increments by 1 on hits and is capped at 4.  Multiple targets can be hit with a single click.

### Misses
A miss results in the multiplier resetting to 1 and losing 1 second.  Misses include actually missing the target or letting the target reach the opposite side.
