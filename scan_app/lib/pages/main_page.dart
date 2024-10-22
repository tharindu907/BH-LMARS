import 'package:flutter/material.dart';
import 'package:scan_app/components/bottom_navigation_item.dart';
import 'package:scan_app/pages/home_page.dart';
import 'package:scan_app/components/app_bar.dart';

class MainPage extends StatefulWidget {
  const MainPage({super.key});

  @override
  State<MainPage> createState() => _MainPageState();
}

class _MainPageState extends State<MainPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const CustomAppBar(title: 'Your App Title'), // Use the custom app bar
      body: const SafeArea(
        child: HomePage(), // Initial page displayed
      ),
      bottomNavigationBar: MyBottomNavigation(
        onTap: () {
          // Navigate back to HomePage
          Navigator.pushAndRemoveUntil(
            context,
            MaterialPageRoute(builder: (context) => const HomePage()),
            (route) => false,
          );
        },
      ),
    );
  }
}

class MyBottomNavigation extends StatelessWidget {
  final VoidCallback onTap;

  const MyBottomNavigation({super.key, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 87,
      margin: const EdgeInsets.symmetric(horizontal: 24, vertical: 16), // Adjust margins
      child: Stack(
        children: [
          Positioned(
            right: 0,
            left: 0,
            top: 0,
            child: Container(
              height: 70,
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: const BorderRadius.all(Radius.circular(25)),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withOpacity(0.2),
                    blurRadius: 8,
                    offset: const Offset(0, -2),
                  ),
                ],
              ),
              child: Row(
                children: [
                  Expanded(
                    child: BottomNavigationItem(
                      onPressed: onTap,
                      icon: Icons.home,
                      current: Menus.home,
                      name: Menus.home,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
