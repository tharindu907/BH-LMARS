import 'package:flutter/material.dart';
import 'package:scan_app/components/bottom_navigation_item.dart';
import 'package:scan_app/config/app_icons.dart';
import 'package:scan_app/pages/home_page.dart';
import 'package:scan_app/pages/profile_page.dart';

class MainPage extends StatefulWidget {
  const MainPage({super.key});

  @override
  State<MainPage> createState() => _MainPageState();
}

class _MainPageState extends State<MainPage> {
  Menus currentIndex = Menus.home;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea( // Ensure content is not hidden behind system UI
        child: Column(
          children: [
            Expanded(
              child: pages[currentIndex.index],
            ),
          ],
        ),
      ),
      bottomNavigationBar: MyBottomNavigation(
        currentIndex: currentIndex,
        onTap: (value) {
          setState(() {
            currentIndex = value;
          });
        },
      ),
    );
  }

  final pages = [
    HomePage(),
    ProfilePage(),
  ];
}

enum Menus {
  home,
  profile,
}

class MyBottomNavigation extends StatelessWidget {
  final Menus currentIndex;
  final ValueChanged<Menus> onTap;

  const MyBottomNavigation({
    super.key,
    required this.currentIndex,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 87,
      margin: EdgeInsets.symmetric(horizontal: 24, vertical: 16), // Adjust margins
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
                borderRadius: BorderRadius.all(Radius.circular(25)),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withOpacity(0.2),
                    blurRadius: 8,
                    offset: Offset(0, -2),
                  ),
                ],
              ),
              child: Row(
                children: [
                  Expanded(
                    child: BottomNavigationItem(
                      onPressed: () => onTap(Menus.home),
                      icon: AppIcons.icHome,
                      current: currentIndex,
                      name: Menus.home,
                    ),
                  ),
                  Expanded(
                    child: BottomNavigationItem(
                      onPressed: () => onTap(Menus.profile),
                      icon: AppIcons.icUser,
                      current: currentIndex,
                      name: Menus.profile,
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
