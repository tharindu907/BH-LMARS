import 'package:flutter/material.dart';
import 'package:scan_app/config/app_routes.dart';
import 'package:scan_app/provider/app_repo.dart';
import 'package:scan_app/provider/user_provider.dart';
import 'package:scan_app/styles/app_colors.dart';
import 'package:provider/provider.dart';

void main() {
  runApp(MultiProvider(
    providers: [
      ChangeNotifierProvider<AppRepo>(
        create: (context) => AppRepo(),
      ),
      ChangeNotifierProvider<UserProvider>(
        create: (context) => UserProvider(),
      ),
    ],
    child: MyApp(),
  ));
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(
        fontFamily: 'Urbanist',
        scaffoldBackgroundColor: AppColors.background,
        brightness: Brightness.dark,
      ),
      initialRoute: AppRoutes.user,
      routes: AppRoutes.pages,
    );
  }
}
