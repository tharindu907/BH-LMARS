import 'package:flutter/material.dart';

enum Menus {
  home,
}

class BottomNavigationItem extends StatelessWidget {
  final VoidCallback onPressed;
  final Menus current;
  final Menus name;
  final IconData icon;

  const BottomNavigationItem({
    super.key,
    required this.onPressed,
    required this.current,
    required this.name,
    required this.icon,
  });

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: onPressed,
      style: ElevatedButton.styleFrom(
        backgroundColor: current == name ? const Color.fromARGB(255, 21, 0, 255) : Colors.white,
        foregroundColor: Colors.black,
        shape: const CircleBorder(),
        padding: const EdgeInsets.all(20),
        elevation: 5,
      ),
      child: Center( // Center the icon inside the button
        child: Icon(
          icon,
          color: current == name ? Colors.white : const Color.fromARGB(255, 21, 0, 255),
        ),
      ),
    );
  }
}
