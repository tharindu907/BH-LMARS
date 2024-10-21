import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';

class BottomNavigationItem extends StatelessWidget {
  final VoidCallback onPressed;
  final String icon;
  final Menus current;
  final Menus name;

  const BottomNavigationItem({
    super.key,
    required this.onPressed,
    required this.icon,
    required this.current,
    required this.name,
  });

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: onPressed,
      style: ElevatedButton.styleFrom(
        backgroundColor: current == name ? Colors.amber : Colors.white, // Yellow background when selected
        foregroundColor: Colors.black, // Icon color
        shape: const CircleBorder(), // Added const to make it a compile-time constant
        padding: const EdgeInsets.all(12), // Added const to make it a compile-time constant
      ),
      child: SvgPicture.asset(
        icon,
        colorFilter: const ColorFilter.mode(Colors.black, BlendMode.srcIn), // Added const to make it a compile-time constant
        height: 24, // Optional: set height of the icon
        width: 24, // Optional: set width of the icon
      ),
    );
  }
}

enum Menus {
  home,
}
