import 'package:flutter/material.dart';
import 'package:scan_app/config/app_routes.dart';
import 'package:scan_app/styles/app_colors.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key}); // Added key parameter

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(
        fontFamily: 'Urbanist',
        scaffoldBackgroundColor: AppColors.background,
        brightness: Brightness.dark,
      ),
      // Change initialRoute to your login page
      initialRoute: AppRoutes.login, // Update this line
      routes: AppRoutes.pages,
    );
  }
}
